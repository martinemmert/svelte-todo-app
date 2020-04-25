/**
 * adds keydown event listener and only dispatches if the
 * key is included in the allowedKeys
 * @param {HTMLElement} node
 * @param {string[]} allowedKeys
 */
function keydownFilter(node, allowedKeys) {
  let whitelist = allowedKeys;
  /**
   * handles the keydown event
   * @param {KeyboardEvent} event
   */
  function handleKeyDown(event) {
    if (!whitelist || !whitelist.includes(event.key)) {
      event.stopImmediatePropagation();
    }
  }

  node.addEventListener("keydown", handleKeyDown, true);

  return {
    /**
     * @param {string[]} allowedKeys
     */
    update(allowedKeys) {
      whitelist = allowedKeys;
    },
    destroy() {
      node.removeEventListener("keydown", handleKeyDown, true);
    },
  };
}

export default keydownFilter;
