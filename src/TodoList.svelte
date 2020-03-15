<script>
  import Todo from "./Todo.svelte";
  export let todos = {};
  export let filter;
  export let compareFunction = undefined;

  $: filteredTodos = Object.values(todos).filter(filter);
  $: orderedTodos = compareFunction ? filteredTodos.sort(compareFunction) : filteredTodos;
</script>

{#if orderedTodos && orderedTodos.length}
  <ul>
    {#each orderedTodos as todo (todo.id)}
      <Todo {todo} />
    {/each}
  </ul>
{:else}
  <p>no items to show ...</p>
{/if}
