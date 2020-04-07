/**
 * Clickoutside Action
 *
 * @param {HTMLElement} node the element to which this action is applied to
 * @param { {exclude: Node[]} } options
 */
function clickoutside(node, { exclude, enabled } = {}) {
  let eventListenersAdded = false;
  let excluded = exclude || [];
  /**
   * @param {HTMLElement} target
   */
  function isExcluded(target) {
    var parent = target;
    while (parent) {
      if (excluded.includes(parent) || parent === node) return true;
      parent = parent.parentNode;
    }
    return false;
  }

  /**
   * @param {MouseEvent} event
   */
  function handleBodyClick(event) {
    if (!isExcluded(event.target)) {
      node.dispatchEvent(new CustomEvent("clickoutside"));
      event.stopPropagation();
    }
  }

  function addEventListeners() {
    if (eventListenersAdded) return;
    // only usable within a browser
    if (window && window.document) {
      document.body.addEventListener("click", handleBodyClick, { capture: true });
      eventListenersAdded = true;
    }
  }

  function removeEventListeners() {
    if (!eventListenersAdded) return;
    // only usable within a browser
    if (window && window.document) {
      document.body.removeEventListener("click", handleBodyClick, { capture: true });
      eventListenersAdded = false;
    }
  }

  // wait until the next js tick otherwise the clickoutside event could
  // be fired within the same click event
  if (enabled) setTimeout(addEventListeners, 0);

  return {
    update({ exclude, enabled }) {
      excluded = exclude || excluded;
      if (enabled) {
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

export default clickoutside;
