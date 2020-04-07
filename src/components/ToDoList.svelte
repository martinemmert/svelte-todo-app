<script>
  import TodoListItem from "./ToDoListItem.svelte";

  export let items;
</script>

<ul>
  {#each items as item (item.id)}
    <TodoListItem {...item} class="mb-2" />
  {/each}
</ul>
