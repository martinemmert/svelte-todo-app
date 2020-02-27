<script>
  import todos from "./todos.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";
</script>

<main>
  <h1>My ToDo's</h1>
  <AddTodoForm />
  <h2>open</h2>
  <TodoList todos={$todos} filter={item => !item.done} />
  <h2>completed</h2>
  <TodoList todos={$todos} filter={item => item.done} />
</main>
