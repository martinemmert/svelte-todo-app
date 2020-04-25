import { Machine } from "xstate";

const STATE_INIT = "INIT";
const STATE_IDLE = "IDLE";

const STATE_MATCHER_INIT = STATE_INIT;
const STATE_MATCHER_IDLE = STATE_IDLE;

const RootMachine = Machine({
  id: "Root",
  initial: STATE_INIT,
  context: {},
  states: {
    [STATE_INIT]: {
      on: {
        "": {
          target: STATE_IDLE,
        },
      },
    },
    [STATE_IDLE]: {},
  },
});

export const CONSTANTS = {
  STATE_INIT,
  STATE_IDLE,
  STATE_MATCHER_INIT,
  STATE_MATCHER_IDLE,
};

export default RootMachine;
