<script>
  import todos from "./todos.js";
  import TodoList from "./TodoList.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";

  todos.reset([
    { id: "1", text: "create an app", done: true },
    { id: "2", text: "deploy via github to zeit", done: true },
    { id: "3", text: "reach world domination", done: false }
  ]);
</script>

<main>
  <h1>My ToDo's</h1>
  <AddTodoForm />
  <h2>open</h2>
  <TodoList todos={$todos} filter={item => !item.done} />
  <h2>completed</h2>
  <TodoList todos={$todos} filter={item => item.done} />
</main>
