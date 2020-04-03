<script context="module">
  export const STATE_IDLE = "idle";
  export const STATE_EDIT_MODE = "edit-mode";
  export const STATE_TASK_COMPLETED = "task-completed";
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import actionable from "./actionable";
  import Checkbox from "./Checkbox.svelte";
  import TextField from "./TextField.svelte";
  import TablerIcon from "../TablerIcon.svelte";

  export let title = "";
  export let state = "idle";

  $: value = title;
  $: completed = state === STATE_TASK_COMPLETED;
  $: editable = state === STATE_EDIT_MODE;
</script>

<div class="flex flex-row items-start">
  <Checkbox checked="{completed}" on:action />
  <TextField {editable} {completed} {value} on:action />
  <ul class="flex flex-row items-center mt-2">
    {#if editable}
      <li use:actionable="{'confirm'}" on:action class="block ml-2 text-teal-500">
        <TablerIcon iconName="circle-check" />
      </li>
      <li use:actionable="{'cancel'}" on:action class="block ml-2 text-gray-500">
        <TablerIcon iconName="circle-x" />
      </li>
    {:else}
      <li use:actionable="{'delete'}" on:action class="block ml-2 text-gray-300">
        <TablerIcon iconName="trash" />
      </li>
    {/if}
  </ul>
</div>
