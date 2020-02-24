<script>
  import { createEventDispatcher } from "svelte";
  export let todo;
  const dispatch = createEventDispatcher();

  function handleChange() {
    if (todo.done) {
      dispatch("uncheck", todo.id);
    } else {
      dispatch("check", todo.id);
    }
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
    <span class:done="{todo.done}">{todo.text}</span>
    <input type="checkbox" checked={todo.done} on:change|preventDefault="{handleChange}" style="display: none;" />
  </label>
</li>