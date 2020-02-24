<script>
  import todos from "./todos.js";
	import TodoList from "./TodoList.svelte";
	
	let newTodo = "";

  todos.reset([
    { id: "1", text: "create an app", done: true },
    { id: "2", text: "deploy via github to zeit", done: true },
    { id: "3", text: "reach world domination", done: false }
  ]);

	function addTodo() {
		todos.add(newTodo);
		newTodo = "";
	}

  function handleCheck({ detail: id }) {
    todos.check(id);
  }

  function handleUncheck({ detail: id }) {
    todos.uncheck(id);
  }
</script>

<main>
  <h1>My ToDo's</h1>
  <form on:submit|preventDefault="{addTodo}">
    <label for="add-input">What needs to be done?</label>
    <input id="add-input" bind:value={newTodo} placeholder="buy milk, walk the cat, etc." />
		<button type="submit">Add</button>
  </form>
  <h2>open</h2>
  <TodoList
    todos={$todos}
    filter={item => !item.done}
    on:check={handleCheck}
    on:uncheck={handleUncheck} />
  <h2>completed</h2>
  <TodoList
    todos={$todos}
    filter={item => item.done}
    on:check={handleCheck}
    on:uncheck={handleUncheck} />
</main>

<style>
	input {
		min-width: 50%;
		height: 40px;
		border: none;
		border-bottom: 1px solid grey;
	}
</style>