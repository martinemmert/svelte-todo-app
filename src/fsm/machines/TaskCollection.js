import { v4 as uuid } from "uuid";
import { Machine, assign } from "xstate";
import { EVENT_COMMIT, EVENT_TOGGLE } from "./Task";

const STATE_LOAD_TASKS = "LOAD_TASKS";
const STATE_IDLE = "IDLE";
const STATE_SHOWING_ALL = "SHOWING_ALL";
const STATE_ADDING_NEW = "ADDING_NEW";

const STATE_MATCHER_INIT = STATE_IDLE;
const STATE_MATCHER_SHOWING_ALL = STATE_SHOWING_ALL;
const STATE_MATCHER_ADDING_NEW_TASK = `${STATE_IDLE}.createTaskForm.${STATE_ADDING_NEW}`;

const EVENT_ADD_NEW_TASK = "ADD_NEW_TASK";

const TaskCollectionMachine = Machine(
  {
    id: "TaskCollection",
    context: {
      newTask: undefined,
      tasks: undefined,
    },
    initial: STATE_LOAD_TASKS,
    states: {
      [STATE_LOAD_TASKS]: {
        entry: assign({
          tasks: () => {
            try {
              // TODO: this can be a procedure?!
              return JSON.parse(localStorage.getItem("todos"));
            } catch (error) {
              console.error(error);
            }
          },
        }),
        on: {
          "": STATE_IDLE,
        },
      },
      [STATE_IDLE]: {
        type: "parallel",
        states: {
          taskList: {
            initial: STATE_SHOWING_ALL,
            states: {
              [STATE_SHOWING_ALL]: {},
            },
          },
          createTaskForm: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  [EVENT_ADD_NEW_TASK]: {
                    target: STATE_ADDING_NEW,
                    actions: assign({ newTask: { title: "", completed: false } }),
                  },
                },
              },
              [STATE_ADDING_NEW]: {},
            },
          },
        },
      },
    },
    on: {
      [`TASK.${EVENT_TOGGLE}`]: {
        actions: [
          assign({
            tasks: (context, { task }) => {
              if (!context.tasks[task.id]) {
                throw new Error(`Task with ID ${task.id} does not exist!`);
              }
              return {
                ...context.tasks,
                [task.id]: {
                  ...context.tasks[task.id],
                  completedOn: task.completed ? new Date().toISOString() : undefined,
                },
              };
            },
          }),
          "persist",
        ],
      },
      [`TASK.${EVENT_COMMIT}`]: {
        actions: [
          assign({
            tasks: (context, { task }) => {
              if (!task.id) {
                task.id = uuid();
                task.createdOn = new Date().toISOString();
              }
              return {
                ...context.tasks,
                [task.id]: { ...context.tasks[task.id], ...task },
              };
            },
          }),
          "persist",
        ],
      },
    },
  },
  {
    actions: {
      persist: (ctx) => {
        localStorage.setItem("todos", JSON.stringify(ctx.tasks));
      },
    },
  },
);

export const CONSTANTS = {
  STATE_SHOWING_ALL,
  STATE_MATCHER_INIT,
  STATE_MATCHER_SHOWING_ALL,
  STATE_MATCHER_ADDING_NEW_TASK,
  EVENT_ADD_NEW_TASK,
};

export default TaskCollectionMachine;
