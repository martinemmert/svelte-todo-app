<script>
  import todos from "./todos.js";
  import filterOptions from "./filterOptions.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";
</script>

<main>
  <h1>My ToDo's</h1>
  <AddTodoForm />
  <div>
    <label>
      <span>Show completed Items:</span>
      <input
        type="checkbox"
        on:change={event => filterOptions.toggleCompletedItems()}
        checked={$filterOptions.displayCompletedItems} />
    </label>
  </div>
  <TodoList todos={$todos} filter={items => !items.completed} />
  {#if $filterOptions.displayCompletedItems}
    <h3>Completed Items</h3>
    <TodoList todos={$todos} filter={items => items.completed} />
  {/if}
</main>
