<script>
  import { createEventDispatcher } from "svelte";
  import todos from "./todos.js";

  export let todo;
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<li>
  <span
    on:click={() => todos.toggle(todo.id)}
    class:done={todo.done}>
    {#if todo.done}◉{:else}○{/if}
    {todo.text}
  </span>
  <span
    on:click={() => confirm('Do you really want to delete this item?') && todos.remove(todo.id)}>
    🚫
  </span>
</li>
