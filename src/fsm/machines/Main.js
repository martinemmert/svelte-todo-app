import { Machine } from "xstate";

const MainMachine = Machine({
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {},
  },
});

export default MainMachine;
