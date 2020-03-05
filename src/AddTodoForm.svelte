<script>
  import todos from "./todos.js";
	
	let newTodo = "";

	function addTodo() {
		todos.add(newTodo);
		newTodo = "";
	}
</script>

<form on:submit|preventDefault={addTodo}>
  <label for="add-input">What needs to be done?</label>
  <input
    id="add-input"
    class="form-input"
    bind:value={newTodo}
    placeholder="buy milk, walk the cat, etc." />
  <button type="submit" disabled={newTodo.trim() === ''}>Add</button>
</form>
