<script context="module">
  const TF_CLASS_NAMES_DEFAULT =
    "block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded focus:outline-none transition transition-colors duration-150 ease-out";
  const TF_CLASS_NAMES_IDLE = `${TF_CLASS_NAMES_DEFAULT} text-gray-800 cursor-text border-transparent`;
  const TF_CLASS_NAMES_EDITABLE = `${TF_CLASS_NAMES_DEFAULT} appearance-none text-gray-800 cursor-text bg-gray-100 border-gray-400`;
  const TF_CLASS_NAMES_COMPLETED = `${TF_CLASS_NAMES_DEFAULT} text-gray-500 cursor-default border-transparent line-through`;
</script>

<script>
  import { tick, getContext } from "svelte";
  import { derived } from "svelte/store";
  import TaskMachine from "~fsm/machines/Task";
  import useMachine from "~fsm/useMachine";
  import TablerIcon from "~components/TablerIcon";
  import Checkbox from "./Checkbox.svelte";
  import TextInput from "./TextInput.svelte";

  export let task;

  // references
  let textFieldReference;
  let refOptions;

  // context
  const ConfiguredTaskMachine = TaskMachine.withConfig(
    {
      guards: {
        beforeCancel: ctx => {
          console.log("FIFI", ctx.prevTitle, ctx.title);
          return ctx.prevTitle === ctx.title || confirm("Discard changes?");
        },
      },
    },
    task,
  );

  const parentService = getContext("fsm/parentService");
  const [currentState, send] = useMachine(ConfiguredTaskMachine, { parent: parentService });
  const currentContext = derived(currentState, $currentState => $currentState.context);
</script>

{#if $currentState.matches('active')}
  {#if $currentState.matches('active.reading')}
    <div class="flex flex-row items-start">
      <Checkbox
        checked="{$currentState.matches('active.reading.completed')}"
        on:click="{() => send('toggle')}"
      />
      {#if $currentState.matches('active.reading.completed')}
        <p class="{TF_CLASS_NAMES_COMPLETED}">{$currentContext.title}</p>
      {:else}
        <p class="{TF_CLASS_NAMES_IDLE}" on:click="{() => send('edit')}">{$currentContext.title}</p>
      {/if}
      <ul bind:this="{refOptions}" class="flex flex-row items-center mt-2">
        <li class="block ml-2 text-gray-300" on:click="{() => send('delete')}">
          <TablerIcon iconName="trash" class="w-8 h-8" />
        </li>
      </ul>
    </div>
  {:else if $currentState.matches('active.editing')}
    <div class="flex flex-row items-start">
      <Checkbox checked="{$currentState.matches('active.reading.completed')}" />
      <TextInput
        title="{$currentContext.title}"
        on:commit="{({ detail }) => send('commit', detail)}"
        on:cancel="{() => send('cancel')}"
      />
    </div>
  {/if}
{:else}deleted{/if}
