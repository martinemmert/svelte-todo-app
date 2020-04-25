import { Machine, assign, sendParent } from "xstate";

const STATE_PENDING = "PENDING";
const STATE_READING = "READING";
const STATE_EDITING = "EDITING";
const STATE_COMPLETED = "COMPLETED";
const STATE_DELETED = "DELETED";

const STATE_MATCHER_PENDING = STATE_PENDING;
const STATE_MATCHER_READING = { [STATE_PENDING]: STATE_READING };
const STATE_MATCHER_EDITING = { [STATE_PENDING]: STATE_EDITING };
const STATE_MATCHER_COMPLETED = STATE_COMPLETED;
const STATE_MATCHER_DELETED = STATE_DELETED;

export const EVENT_TOGGLE = "TOGGLE";
export const EVENT_OPEN_EDITOR = "OPEN_EDITOR";
export const EVENT_CHANGE_TITLE = "CHANGE_TITLE";
export const EVENT_COMMIT = "COMMIT";
export const EVENT_CANCEL = "CANCEL";
export const EVENT_DELETE = "DELETE";

const TaskMachine = Machine(
  {
    id: "Task",
    context: {},
    initial: "init",
    states: {
      init: {
        on: {
          "": [
            { target: STATE_COMPLETED, cond: (ctx) => ctx.completed },
            { target: `${STATE_PENDING}.${STATE_EDITING}`, cond: (ctx) => ctx.isEditModeEnabled },
            { target: STATE_PENDING },
          ],
        },
      },
      [STATE_PENDING]: {
        id: STATE_PENDING,
        initial: STATE_READING,
        states: {
          [STATE_READING]: {
            on: {
              [EVENT_TOGGLE]: {
                target: `#${STATE_COMPLETED}`,
                actions: [
                  assign({ completed: true }),
                  sendParent((ctx) => ({ type: `TASK.${EVENT_COMMIT}`, task: ctx })),
                ],
              },
              [EVENT_OPEN_EDITOR]: {
                target: STATE_EDITING,
                actions: assign({ prevTitle: (ctx) => ctx.title }),
              },
              [EVENT_DELETE]: `#${STATE_DELETED}`,
            },
          },
          [STATE_EDITING]: {
            entry: ["focusInputField"],
            on: {
              [EVENT_CHANGE_TITLE]: {
                actions: assign({ title: (ctx, { value }) => value }),
              },
              [EVENT_COMMIT]: {
                target: STATE_READING,
                actions: sendParent((ctx) => ({ type: `TASK.${EVENT_COMMIT}`, task: ctx })),
              },
              [EVENT_CANCEL]: {
                target: STATE_READING,
                cond: { type: "beforeCancel" },
                actions: [
                  assign({ title: (ctx) => ctx.prevTitle }),
                  sendParent((ctx) => {
                    return { type: `TASK.${EVENT_COMMIT}`, task: ctx };
                  }),
                ],
              },
            },
          },
        },
      },
      [STATE_COMPLETED]: {
        id: STATE_COMPLETED,
        on: {
          [EVENT_TOGGLE]: {
            target: STATE_PENDING,
            actions: [
              assign({ completed: false }),
              sendParent((ctx) => ({ type: `TASK.${EVENT_COMMIT}`, task: ctx })),
            ],
          },
          [EVENT_DELETE]: `#${STATE_DELETED}`,
        },
      },
      [STATE_DELETED]: {
        id: STATE_DELETED,
        type: "final",
        // onEntry: sendParent(ctx => ({ type: `TASK.${EVENT_DELETE}`, id: ctx.id })),
      },
    },
  },
  {
    guards: {
      beforeCancel: () => true,
    },
  },
);

export const CONSTANTS = {
  STATE_PENDING,
  STATE_READING,
  STATE_EDITING,
  STATE_COMPLETED,
  STATE_DELETED,
  STATE_MATCHER_PENDING,
  STATE_MATCHER_READING,
  STATE_MATCHER_EDITING,
  STATE_MATCHER_COMPLETED,
  STATE_MATCHER_DELETED,
  EVENT_TOGGLE,
  EVENT_OPEN_EDITOR,
  EVENT_CHANGE_TITLE,
  EVENT_COMMIT,
  EVENT_CANCEL,
  EVENT_DELETE,
};

export default TaskMachine;
