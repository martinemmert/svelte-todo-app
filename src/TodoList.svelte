<script>
  export let todos;
</script>

{#if todos && todos.length}
  <ul>
    {#each todos as todo (todo.id)}
      <li>{todo.todo}</li>
    {/each}
  </ul>
{/if}
