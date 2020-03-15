<script>
  import { createEventDispatcher } from "svelte";
  import {
    CheckSquareIcon,
    SquareIcon,
    Trash2Icon,
    CalendarIcon,
    StarIcon
  } from "svelte-feather-icons";
  import { IconDone } from "./icons";
  import DateSelector from "./DateSelector.svelte";
  import PrioritySwitch from "./PrioritySwitch.svelte";
  import DeleteButton from "./DeleteButton.svelte";
  import cx from "classnames";

  export let id;
  export let priority;
  export let completed = false;
  export let dueDate;
  export let text;

  export let minDueDate = new Date();
  export let maxDueDate;
  let cn;
  export { cn as class };

  const dispatch = createEventDispatcher();

  function clickToggleHandler(event) {
    dispatch("toggle", id);
  }

  function changePriorityHandler(event) {
    dispatch("changePriority", event.detail);
  }

  function changeDueDateHandler(event) {
    dispatch("changeDueDate", event.detail);
  }

  function clickDeleteHandler(event) {
    dispatch("delete", id);
  }
</script>

<li
  class={cx('relative flex overflow-hidden list-none bg-white border-l-2 shadow-md group', cn)}
  class:border-transparent={!priority}
  class:border-red-500={priority}>
  <div class="flex items-center p-3">
    <button
      type="button"
      class="flex items-center justify-center block w-6 h-6 text-white bg-gray-400 rounded shadow-inner focus:outline-none"
      on:click|preventDefault={clickToggleHandler}>
      {#if completed}
        <IconDone class="w-5 h-5" />
      {/if}
    </button>
    <p
      class:text-gray-500={completed}
      class:line-through={completed}
      class="px-2">
      {text}
    </p>
  </div>
  <div class="flex items-center justify-between flex-1 px-2 bg-white bg-gray-200">
    {#if !completed}
      <PrioritySwitch
        bind:checked={priority}
        on:change={changePriorityHandler} />
      <DateSelector bind:value={dueDate} on:change={changeDueDateHandler} />
    {/if}
    <DeleteButton on:click={clickDeleteHandler} />
  </div>
</li>
