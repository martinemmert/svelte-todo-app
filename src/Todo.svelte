<script>
  import { createEventDispatcher } from "svelte";
  import todos from "./todos.js";

  export let todo;

  function handleChange() {
    (todo.done ? todos.uncheck : todos.check)(todo.id);
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<li>
  <label>
    {#if todo.done}◉{:else}○{/if}
    <span class:done={todo.done}>{todo.text}</span>
    <input
      type="checkbox"
      checked={todo.done}
      on:change|preventDefault={handleChange}
      style="display: none;" />
  </label>
</li>
