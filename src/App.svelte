<script>
  import TodoList from "./TodoList.svelte";
  const todos = [
    { id: "1", todo: "create an app", done: true },
    { id: "2", todo: "deploy via github to zeit", done: true },
    { id: "3", todo: "reach world domination", done: false }
  ];
</script>

<main>
  <h1>My ToDo's</h1>
  <h2>open:</h2>
  <TodoList todos={todos.filter(item => !item.done)} />
  <h2>archived:</h2>
  <TodoList todos={todos.filter(item => item.done)} />
</main>
