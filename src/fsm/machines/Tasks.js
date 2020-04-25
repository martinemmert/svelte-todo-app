import { Machine, assign } from "xstate";

const TasksMachine = Machine({
  id: "tasks",
  initial: "idle",
  context: {
    tasks: [],
  },
  states: {
    idle: {},
  },
  on: {
    addNewTask: {
      actions: assign({
        tasks: (context) => [...context.tasks, { title: "new item" }],
      }),
    },
  },
});

export default TasksMachine;
