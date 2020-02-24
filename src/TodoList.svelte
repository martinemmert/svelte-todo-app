<script>
  import Todo from "./Todo.svelte";
  export let todos = [];
  export let filter;

  $: filteredTodos = todos.filter(filter);

</script>

{#if filteredTodos && filteredTodos.length}
  <ul>
    {#each filteredTodos as todo (todo.id)}
      <Todo {todo} on:check on:uncheck />
    {/each}
  </ul>
{:else}
  <p>... no items to show ...</p>
{/if}
