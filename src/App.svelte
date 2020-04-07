<script>
  import todos from "./todos.js";
  import * as todoUtils from "./todo-utilities.js";
  import { sortOrder, displayCompletedItems } from "./filterOptions.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";

  import NavBar from "./components/NavBar.svelte";
  import TaskList from "./components/TaskListItem/List.svelte";

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

  function handleAction(action) {
    const { type, payload = identityObject } = action;
    const { id, title } = payload;
    console.log({ type, ...payload });
    switch (type) {
      case "toggle":
        todos.toggle(id);
        break;
      case "edit":
        selectedTask = id;
        break;
      case "change":
        todos.setText(id, title);
        selectedTask = undefined;
        break;
      case "cancel":
        selectedTask = undefined;
        break;
      case "delete":
        if (confirm("Delete Item?")) todos.remove(id);
        break;
    }
  }
</script>

<main>
  <NavBar />
  <div class="max-w-3xl px-8 mx-auto mt-6 md:mt-12">
    <TaskList {tasks} {selectedTask} on:action="{event => handleAction(event.detail)}" />
  </div>
  <hr class="mt-4" />
  old stuff
  <AddTodoForm />
  <div>
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
  </div>
</main>
