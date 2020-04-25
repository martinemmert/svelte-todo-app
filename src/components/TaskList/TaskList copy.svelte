<script>
  import TaskListItem from "./Item";

  export let tasks;
</script>

<style>
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @keyframes float2 {
    0% {
      opacity: 1;
      transform: translatey(0px);
    }
    50% {
      opacity: 0.8;
      transform: translatey(10px);
    }
    100% {
      opacity: 1;
      transform: translatey(0px);
    }
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }

  .float-text {
    animation: float2 6s ease-in-out infinite;
  }
</style>

<h1
  class="mb-6 font-serif text-lg font-semibold leading-none text-gray-800 ml-14 md:text-2xl md:mb-14"
>
  Inbox
</h1>
{#if tasks && tasks.length}
  <ul>
    {#each tasks as task (task.id)}
      <li class="mt-4 md:mt-2 first:mt-0">
        <TaskListItem {task} />
      </li>
    {/each}
  </ul>
{:else}
  <div class="flex flex-col items-center">
    <img
      class="block float"
      src="/assets/Illustrations/meditating.svg"
      alt="Illustration of a character during meditation."
    />
    <h2 class="text-2xl font-bold text-teal-400 float-text font-handwritten">fini ...</h2>
  </div>
{/if}
