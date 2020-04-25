<script>
  import { derived } from "svelte/store";
  import TablerIcon from "~components/TablerIcon";
  import TaskList from "~components/TaskList";
  import useMachine from "~fsm/useMachine";
  import TasksMachine from "~fsm/machines/Tasks";

  const [currentState, send] = useMachine(TasksMachine);
  const tasks = derived(currentState, $currentState => $currentState.context.tasks);
</script>

<div class="max-w-3xl px-8 mx-auto mt-6 md:my-12">
  <h1
    class="mb-6 font-serif text-lg font-semibold leading-none text-gray-800 ml-14 md:text-2xl md:mb-14"
  >
    Inbox
  </h1>
  {#if $tasks.length}
    <TaskList tasks="{$tasks}" />
  {:else}
    <div class="flex flex-col items-center">
      <img
        class="block"
        src="/assets/Illustrations/meditating.svg"
        alt="Illustration of a character during meditation."
      />
      <h2 class="text-2xl font-bold text-teal-400 float-text font-handwritten">fini ...</h2>
    </div>
  {/if}
  <button class="flex items-center mt-6 text-gray-600 ml-14" on:click="{() => send('addNewTask')}">
    <TablerIcon iconName="circle-plus" class="w-6 h-6" />
    <span class="relative ml-2 font-sans leading-none uppercase text-small">Add new task</span>
  </button>
</div>
