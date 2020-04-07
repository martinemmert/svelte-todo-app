function actionable(node, options) {
  let eventListenersAdded = false;
  let { type, enabled = true, preventDefault, stopPropagation } = options;

  function dispatchAction(event) {
    if (preventDefault) event.preventDefault();
    if (stopPropagation) event.stopPropagation();
    node.dispatchEvent(new CustomEvent("action", { detail: type }));
  }

  function handleKeyPress(event) {
    if (event.key === " " || event.key === "Spacebar" || event.key === "Enter") {
      dispatchAction(event);
    }
  }

  function handleClick(event) {
    dispatchAction(event);
  }

  function addEventListeners() {
    if (eventListenersAdded) return;
    node.addEventListener("keypress", handleKeyPress);
    node.addEventListener("click", handleClick);
    eventListenersAdded = true;
  }

  function removeEventListeners() {
    if (!eventListenersAdded) return;
    node.removeEventListener("click", handleClick);
    node.removeEventListener("keypress", handleKeyPress);
    eventListenersAdded = false;
  }

  if (enabled) setTimeout(addEventListeners, 0);

  return {
    update(options) {
      type = options.type;
      preventDefault = options.preventDefault;
      stopPropagation = options.stopPropagation;
      if (options.enabled) {
        addEventListeners();
      } else {
        removeEventListeners();
      }
    },
    destroy() {
      removeEventListeners();
    },
  };
}

export default actionable;
