<script>
  import todos from "./todos.js";
  import * as todoUtils from "./todo-utilities.js";
  import { sortOrder, displayCompletedItems } from "./filterOptions.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";

  let orderFunction = todoUtils.orderAscendingByCreationDate;

  sortOrder.subscribe(val => {
    switch (val) {
      case "dueDateAscending":
        orderFunction = todoUtils.orderAscendingByDueDate;
        break;
      case "dueDateDescending":
        orderFunction = todoUtils.orderDescendingByDueDate;
        break;
      default:
        orderFunction = todoUtils.orderAscendingByCreationDate;
        break;
    }
  });
</script>

<main>
  <h1>My ToDo's</h1>
  <AddTodoForm />
  <div>
    <label>
      <span>Show completed Items:</span>
      <input type="checkbox" bind:checked={$displayCompletedItems} />
    </label>
    <fieldset>
      <label>
        <input type="radio" bind:group={$sortOrder} value="creationDate" />
        Creation Date 🔼
      </label>
      <label>
        <input type="radio" bind:group={$sortOrder} value="dueDateAscending" />
        Due Date 🔼
      </label>
      <label>
        <input type="radio" bind:group={$sortOrder} value="dueDateDescending" />
        Due Date 🔽
      </label>
    </fieldset>
  </div>
  <TodoList
    todos={$todos}
    filter={items => !items.completed}
    compareFunction={orderFunction} />
  {#if $displayCompletedItems}
    <h3>Completed Items</h3>
    <TodoList
      todos={$todos}
      filter={items => items.completed}
      compareFunction={todoUtils.orderDescendingByCompletionDate} />
  {/if}
</main>
