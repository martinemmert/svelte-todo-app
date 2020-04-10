<script context="module">
  const TF_CLASS_NAMES_DEFAULT =
    "block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded focus:outline-none transition transition-colors duration-150 ease-out";
  const TF_CLASS_NAMES_IDLE = `${TF_CLASS_NAMES_DEFAULT} text-gray-800 cursor-text border-transparent`;
  const TF_CLASS_NAMES_EDITABLE = `${TF_CLASS_NAMES_DEFAULT} appearance-none text-gray-800 cursor-text bg-gray-100 border-gray-400`;
  const TF_CLASS_NAMES_COMPLETED = `${TF_CLASS_NAMES_DEFAULT} text-gray-500 cursor-default border-transparent line-through`;
</script>

<script>
  import { createEventDispatcher, afterUpdate } from "svelte";
  import { writable } from "svelte/store";

  import createHandleAction, { getActionTypeFromEvent } from "~utils/createHandleAction";
  import actionable from "~actions/actionable";
  import clickoutside from "~actions/clickoutside";
  import TablerIcon from "~components/TablerIcon";

  export let title = "";
  export let isTaskCompleted = false;
  export let isEditModeEnabled = false;

  const dispatch = createEventDispatcher();
  const handleAction = createHandleAction(dispatch);
  const value = writable(title);

  let textField;
  let options;

  $: textFieldClassName = isEditModeEnabled ? TF_CLASS_NAMES_EDITABLE : TF_CLASS_NAMES_IDLE;

  function actionHandler(event) {
    const type = getActionTypeFromEvent(event);
    if (isTaskCompleted) return handleAction(event);
    switch (type) {
      case "cancel":
        $value = title;
        return handleAction("cancel");
      case "confirm":
        return (
          ($value === title && handleAction("cancel")) ||
          ($value !== title && handleAction("change", { title: $value }))
        );
      default:
        return handleAction(event);
    }
  }

  function onKeyDown(event) {
    const { key } = event;
    if (!isEditModeEnabled) {
      switch (key) {
        case "Enter":
        case "Space":
        case " ":
          actionHandler("edit");
          break;
      }
    } else {
      switch (key) {
        case "Enter":
          actionHandler("confirm");
          break;
        case "Escape":
          actionHandler("cancel");
          break;
      }
    }
  }

  afterUpdate(() => {
    if (textField && isEditModeEnabled) {
      if (document.activeElement !== textField) textField.focus();
    }
  });
</script>

<div class="flex flex-row items-start">
  <!-- begin: checkbox -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="flex-none w-8 h-8 mt-2 mr-2 cursor-pointer focus:outline-none"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    use:actionable="{{ type: 'toggle' }}"
    on:action
  >
    {#if isTaskCompleted}
      <rect
        stroke-width="2"
        fill="currentColor"
        class="text-gray-200"
        stroke="currentColor"
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
      ></rect>
      <path
        fill="none"
        stroke-width="2"
        stroke="currentColor"
        class="text-gray-600"
        d="M9 12l2 2l4 -4"
      ></path>
    {:else}
      <rect
        fill="none"
        stroke-width="2"
        stroke="currentColor"
        x="4"
        y="4"
        class="text-gray-400"
        width="16"
        height="16"
        rx="2"
      ></rect>
    {/if}
  </svg>
  <!-- begin: text field -->
  {#if !isTaskCompleted}
    {#if isEditModeEnabled}
      <input
        type="text"
        bind:this="{textField}"
        use:clickoutside="{{ enabled: isEditModeEnabled, exclude: [options] }}"
        on:clickoutside="{() => actionHandler('cancel')}"
        on:keydown="{onKeyDown}"
        class="{TF_CLASS_NAMES_EDITABLE}"
        bind:value="{$value}"
      />
    {:else}
      <p
        class="{TF_CLASS_NAMES_IDLE}"
        on:click="{() => !isEditModeEnabled && handleAction('edit')}"
      >
        {$value}
      </p>
    {/if}
  {:else}
    <p class="{TF_CLASS_NAMES_COMPLETED}">{$value}</p>
  {/if}
  <!-- begin: options -->
  <ul bind:this="{options}" class="flex flex-row items-center mt-2">
    {#if isEditModeEnabled}
      <li
        use:actionable="{{ type: 'confirm' }}"
        on:action="{actionHandler}"
        class="block ml-2 text-teal-500"
      >
        <TablerIcon iconName="circle-check" class="w-8 h-8" />
      </li>
      <li
        use:actionable="{{ type: 'cancel' }}"
        on:action="{actionHandler}"
        class="block ml-2 text-gray-500"
      >
        <TablerIcon iconName="circle-x" class="w-8 h-8" />
      </li>
    {:else}
      <li
        use:actionable="{{ type: 'delete' }}"
        on:action="{actionHandler}"
        class="block ml-2 text-gray-300"
      >
        <TablerIcon iconName="trash" class="w-8 h-8" />
      </li>
    {/if}
  </ul>
</div>
