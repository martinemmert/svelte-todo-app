<script>
  import * as todoUtils from "~utils/todo-utilities.js";
  import todos from "~stores/todos.js";
  import { sortOrder, displayCompletedItems } from "~stores/filterOptions.js";

  import NavBar from "~components/NavBar";
  import TaskList from "~components/TaskList";

  let orderFunction = todoUtils.orderAscendingByCreationDate;

  $: tasks = Array.from(Object.values($todos), task => {
    return { ...task, title: task.text, state: task.completed ? "task-completed" : "idle" };
  });

  sortOrder.subscribe(val => {
    switch (val) {
      case "dueDateAscending":
        orderFunction = todoUtils.orderAscendingByDueDate;
        break;
      case "dueDateDescending":
        orderFunction = todoUtils.orderDescendingByDueDate;
        break;
      case "priorityDescending":
        orderFunction = todoUtils.orderDescendingByPriority;
        break;
      default:
        orderFunction = todoUtils.orderAscendingByCreationDate;
        break;
    }
  });

  const identityObject = {};

  let selectedTask = undefined;
  let isAddModeEnabled = false;

  function handleAction(action) {
    const { type, payload = identityObject } = action;
    const { id, title } = payload;
    console.log({ type, ...payload });
    switch (type) {
      case "add":
        isAddModeEnabled = true;
        break;
      case "toggle":
        return todos.toggle(id);
      case "edit":
        selectedTask = id;
        break;
      case "change":
        selectedTask = undefined;
        isAddModeEnabled = false;
        return id === "__NEW_TASK__" ? todos.add(title) : todos.setText(id, title);
      case "cancel":
        selectedTask = undefined;
        isAddModeEnabled = false;
        break;
      case "delete":
        return confirm("Delete Item?") && todos.remove(id);
    }
  }
</script>

<main>
  <NavBar />
  <div class="max-w-3xl px-8 mx-auto mt-6 md:my-12">
    <TaskList
      {tasks}
      {selectedTask}
      {isAddModeEnabled}
      on:action="{event => handleAction(event.detail)}"
    />
  </div>
  <!-- <div>
    <label>
      <span>Show completed Items:</span>
      <input type="checkbox" bind:checked="{$displayCompletedItems}" />
    </label>
    <fieldset>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="creationDate" />
        Creation Date 🔼
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="dueDateAscending" />
        Due Date 🔼
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="dueDateDescending" />
        Due Date 🔽
      </label>
      <label>
        <input type="radio" bind:group="{$sortOrder}" value="priorityDescending" />
        Priority 🔽
      </label>
    </fieldset>
  </div> -->
</main>
