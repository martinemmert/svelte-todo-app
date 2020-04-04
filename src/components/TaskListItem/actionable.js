function actionable(node, action) {
  function handleKeyPress(event) {
    if (event.key === " " || event.key === "Spacebar" || event.key === "Enter") {
      node.dispatchEvent(new CustomEvent("action", { detail: action }));
    }
  }

  function handleClick() {
    node.dispatchEvent(new CustomEvent("action", { detail: action }));
  }

  // node.setAttribute("role", "button");
  // node.setAttribute("tabindex", "0");
  node.addEventListener("keypress", handleKeyPress);
  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
      node.removeEventListener("keypress", handleKeyPress);
    },
  };
}

export default actionable;
