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

  function handleAction({ action, id }) {
    console.log(action, id);
    switch (action) {
      case "toggle":
        todos.toggle(id);
        tasks = tasks;
        break;
      case "delete":
        if (confirm("Delete Item?")) todos.remove(id);
        break;
    }
  }
</script>

<main>
  <NavBar />
  <div class="max-w-3xl mx-auto mt-12">
    <TaskList {tasks} on:action="{event => handleAction(event.detail)}" />
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
