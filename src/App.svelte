<script>
  import todos from "./todos.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";
</script>

<main>
  <h1>My ToDo's</h1>
  <AddTodoForm />
  <TodoList todos={$todos} filter={item => !item.done} />
</main>
