import { Machine, assign } from "xstate";

const TaskMachine = Machine({
  id: "task",
  initial: "active",
  context: {
    task: { title: "", completed: false, archived: false },
  },
  states: {
    active: {
      id: "active",
      initial: "reading",
      states: {
        reading: {
          initial: "init",
          states: {
            init: {
              on: {
                "": [
                  { target: "completed", cond: ({ completed }) => completed },
                  { target: "pending" },
                ],
              },
            },
            pending: {
              on: {
                edit: "#active.editing",
                toggle: {
                  target: "completed",
                  actions: assign({
                    completed: true,
                    completedOn: new Date().toISOString(),
                  }),
                },
              },
            },
            completed: {
              on: {
                toggle: {
                  target: "pending",
                  actions: assign({
                    completed: false,
                    completedOn: undefined,
                  }),
                },
              },
            },
          },
        },
        editing: {
          id: "editing",
          on: {
            commit: {
              target: "commiting",
              actions: assign({ title: (_, { title }) => title }),
            },
            cancel: {
              target: "reading",
            },
          },
        },
        commiting: {
          on: { "": "reading" },
        },
      },
    },
    deleted: {
      type: "final",
    },
  },
  on: {
    deleteTask: {
      target: "deleted",
    },
  },
});

export default TaskMachine;
