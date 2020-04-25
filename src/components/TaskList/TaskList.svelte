<script>
  import TaskListItem from "./Item";
  export let tasks;
</script>

<ul>
  {#each tasks as task (task.id)}
    <li class="mt-4 md:mt-2 first:mt-0">
      <TaskListItem {task} />
    </li>
  {/each}
</ul>
