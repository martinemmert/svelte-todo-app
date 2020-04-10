<script>
  import { createEventDispatcher } from "svelte";

  import createHandleAction from "~utils/createHandleAction";
  import TaskListItem from "./Item";
  import TablerIcon from "~components/TablerIcon";

  export let tasks;
  export let selectedTask = undefined;
  export let isAddModeEnabled = false;

  const dispatch = createEventDispatcher();
  const handleAction = createHandleAction(dispatch);
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

<h1 class="mb-6 font-serif text-lg font-semibold leading-none text-gray-800 ml-14 md:text-2xl md:mb-14">
  Inbox
</h1>
{#if tasks && (tasks.length || isAddModeEnabled)}
  <ul>
    {#each tasks as task (task.id)}
      <li class="mt-4 md:mt-2 first:mt-0">
        <TaskListItem
          title="{task.title}"
          isTaskCompleted="{task.completed}"
          isEditModeEnabled="{task.id === selectedTask}"
          on:action="{event => handleAction(event, { id: task.id })}"
        />
      </li>
    {/each}
    {#if isAddModeEnabled}
      <li class="mt-4 md:mt-2 first:mt-0">
        <TaskListItem
          title=""
          isEditModeEnabled
          on:action="{event => handleAction(event, { id: '__NEW_TASK__' })}"
        />
      </li>
    {/if}
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
{#if !isAddModeEnabled}
  <button class="flex items-center mt-6 text-gray-600 ml-14" on:click="{() => handleAction('add')}">
    <TablerIcon iconName="circle-plus" class="w-6 h-6" />
    <span class="relative ml-2 font-sans leading-none uppercase text-small">Add new task</span>
  </button>
{/if}
