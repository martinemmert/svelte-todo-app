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
  import { interpret } from "xstate";
  import TaskMachine, { CONSTANTS } from "~fsm/machines/_Task";
  import useMachine from "~fsm/useMachine";
  import clickoutside from "~actions/clickoutside";
  import TablerIcon from "~components/TablerIcon";
  import Checkbox from "./Checkbox.svelte";

  export let task;

  // references
  let textFieldReference;
  let refOptions;

  // context
  const ConfiguredTaskMachine = TaskMachine.withConfig(
    {
      actions: {
        focusInputField: async () => {
          await tick();
          textFieldReference.focus();
        },
      },
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

{#if $currentState.matches(CONSTANTS.STATE_MATCHER_COMPLETED) || $currentState.matches(CONSTANTS.STATE_MATCHER_PENDING)}
  <div class="flex flex-row items-start">
    <Checkbox
      checked="{$currentState.matches(CONSTANTS.STATE_MATCHER_COMPLETED)}"
      on:click="{() => send({ type: CONSTANTS.EVENT_TOGGLE })}"
    />
    {#if $currentState.matches(CONSTANTS.STATE_MATCHER_READING)}
      <p
        class="{TF_CLASS_NAMES_IDLE}"
        on:click="{() => send({ type: CONSTANTS.EVENT_OPEN_EDITOR })}"
      >
        {$currentContext.title}
      </p>
    {/if}
    {#if $currentState.matches(CONSTANTS.STATE_MATCHER_EDITING)}
      <input
        type="text"
        bind:this="{textFieldReference}"
        class="{TF_CLASS_NAMES_EDITABLE}"
        value="{$currentContext.title}"
        use:clickoutside="{{ enabled: true, exclude: [refOptions] }}"
        on:clickoutside="{() => send({ type: CONSTANTS.EVENT_CANCEL })}"
        on:keydown="{event => {
          if (event.key === 'Enter') send({ type: CONSTANTS.EVENT_COMMIT });
          if (event.key === 'Escape') send({ type: CONSTANTS.EVENT_CANCEL });
        }}"
        on:input="{event => send({
            type: CONSTANTS.EVENT_CHANGE_TITLE,
            value: event.target.value,
          })}"
      />
    {/if}
    {#if $currentState.matches(CONSTANTS.STATE_MATCHER_COMPLETED)}
      <p class="{TF_CLASS_NAMES_COMPLETED}">{$currentContext.title}</p>
    {/if}

    <ul bind:this="{refOptions}" class="flex flex-row items-center mt-2">
      {#if $currentState.matches(CONSTANTS.STATE_MATCHER_EDITING)}
        <li
          class="block ml-2 text-teal-500"
          on:click="{() => send({ type: CONSTANTS.EVENT_COMMIT })}"
        >
          <TablerIcon iconName="circle-check" class="w-8 h-8" />
        </li>
        <li
          class="block ml-2 text-gray-500"
          on:click="{() => send({ type: CONSTANTS.EVENT_CANCEL })}"
        >
          <TablerIcon iconName="circle-x" class="w-8 h-8" />
        </li>
      {/if}
      {#if $currentState.matches(CONSTANTS.STATE_MATCHER_READING) || $currentState.matches(CONSTANTS.STATE_MATCHER_COMPLETED)}
        <li
          class="block ml-2 text-gray-300"
          on:click="{() => send({ type: CONSTANTS.EVENT_DELETE })}"
        >
          <TablerIcon iconName="trash" class="w-8 h-8" />
        </li>
      {/if}
    </ul>
  </div>
{/if}
