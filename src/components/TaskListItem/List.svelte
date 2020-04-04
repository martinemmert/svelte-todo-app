<script>
  import { createEventDispatcher } from "svelte";
  import Task from "./Task.svelte";
  import TablerIcon from "../TablerIcon.svelte";

  export let tasks;

  const dispatch = createEventDispatcher();
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

<h1 class="mb-6 font-serif text-lg font-semibold leading-none text-gray-800 md:text-2xl md:mb-14">Inbox</h1>
{#if tasks}
  <ul>
    {#each tasks as task (task.id)}
      <li class="mt-4 md:mt-2 first:mt-0">
        <Task
          title={task.title}
          state={task.state}
          on:action="{event => dispatch('action', { id: task.id, action: event.detail })}"
        />
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
<button
  class="flex items-center mt-2 text-gray-600 ml-14"
  on:click="{() => dispatch('action', { action: 'add' })}"
>
  <TablerIcon iconName="circle-plus" class="w-6 h-6" />
  <span class="relative ml-2 font-sans leading-none uppercase text-small">Add new task</span>
</button>
