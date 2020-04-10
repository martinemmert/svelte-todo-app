export const getActionTypeFromEvent = event => {
  if (typeof event === "string") return event;
  if (typeof event.detail === "string") return event.detail;
  if (typeof event.detail.type === "string") return event.detail.type;
  throw new Error("Event is missing action type");
};

export const getPayloadFromEvent = event => {
  if (event.detail && event.detail.payload) return event.detail.payload;
};

/**
 * @param {(type: string, detail?: any) => void} dispatch
 * @returns {(event: string | { detail: string } | { detail: { type: string } }, [payload]: object) => void;}
 */
const createHandleAction = dispatch => {
  return (event, payload) => {
    const type = getActionTypeFromEvent(event);
    const eventPayload = getPayloadFromEvent(event);
    dispatch("action", { type, payload: { ...eventPayload, ...payload } });
  };
};

export default createHandleAction;
