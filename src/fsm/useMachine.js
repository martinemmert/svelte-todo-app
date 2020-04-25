import { writable } from "svelte/store";
import { interpret } from "xstate";

/**
 * Interprets and subscribes to a machines transitions.
 * The returned tuple contains at the current state and the send method
 *
 * @param {import("xstate").StateMachine} machine
 * @param {import("xstate").InterpreterOptions} [options]
 *
 * @returns [currentState, send]
 */
function useMachine(machine, options) {
  /**
   * @param {import("xstate").State}
   */
  const currentState = writable(machine.initialState);
  const service = interpret(machine, options)
    .onTransition((state) => {
      currentState.set(state);
    })
    .start();

  if (process.env.DEBUG) {
    if (options && options.parent) {
      console.log("fsm/service-relation: %s <- %s", options.parent.id, service.id);
    }
    service
      .onSend(({ type, ...rest }) => {
        console.log("%s::onSend -> %s", service.id, type, rest);
      })
      .onEvent(({ type, ...rest }) => {
        console.log("%s::onEvent -> %s", service.id, type, rest);
      })
      .onTransition((state, { type, ...rest }) => {
        console.groupCollapsed("%s::onTransition -> State: %s", service.id, ...state.toStrings());
        console.log("Event: %s %o", service.id, type, rest);
        console.groupEnd();
      });
  }

  return [currentState, service.send, service];
}

export default useMachine;
