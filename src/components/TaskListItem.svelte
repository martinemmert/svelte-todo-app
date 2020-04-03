<script>
  import { createEventDispatcher } from "svelte";
  import TablerIcon from "./TablerIcon.svelte";

  const dispatch = createEventDispatcher();

  export let title;
  export let completed;

  let titleEl;
  let editmode = false;
  let previousTitle;

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 13: // ENTER
        title = titleEl.textContent;
        dispatch("change", title);
        toggleEditor();
        dispatch("edit:start");
        break;
      case 27: // ESC
        title = previousTitle;
        toggleEditor();
        dispatch("edit:end");
        break;
    }
  }

  function isExcluded(target) {
    var parent = target;
    while (parent) {
      if (parent === titleEl) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  // todo: make use of use:
  const clickOutSideHandler = event => {
    if (!isExcluded(event.target)) toggleEditor();
  };

  function toggleEditor() {
    editmode = !editmode;
    if (editmode) {
      previousTitle = title;
      document.addEventListener("keydown", handleKeyDown);
      document.body.addEventListener("click", clickOutSideHandler);
      setTimeout(() => titleEl.focus(), 0);
    } else {
      titleEl.textContent = title;
      document.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("click", clickOutSideHandler);
    }
  }
</script>

<style>
  :root {
    --gray-100: #f5f7fa;
    --gray-400: #9aa5b1;
    --gray-500: #A0AEC0;
    --gray-800: #2d3748;

    --teal-400: #4FD1C5;
    --teal-500: #38B2AC;
  }

  .task-list-item {
    font-family: freight-text-pro, serif;
    font-weight: 500;
    font-style: normal;
    font-size: 1.0625rem;
    line-height: 1.5rem;
    align-items: flex-start;
  }

  .checkbox {
    display: block;
    margin: 0.5rem 0.375rem 0 0;
  }

  .title {
    position: relative;
    display: block;
    margin-right: auto;
    padding: 0.375rem 0.75rem;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--gray-800);
  }

  .title.editable {
    background-color: var(--gray-100);
    border-color: var(--gray-400);
    outline: none;
  }

  .options {
    display: flex;
    margin: 0.5rem 0 0 0.75rem;
  }

  .save-button, .cancel-button, .delete-button {
    display: block;
    outline: none;
  }

  .save-button {
    color: var(--teal-400);
  }

  .save-button:hover, .save-button:focus {
    color: var(--teal-500);
  }

  .cancel-button {
    margin: 0 0 0 0.375rem;
    color: var(--gray-500);
  }

  .delete-button {
    position: relative;
    top: -1px;
  }
</style>

<div class="flex w-full text-lg leading-normal task-list-item">
  <button type="button" class="checkbox" on:click="{() => dispatch('select')}">
    {#if completed}
      <TablerIcon iconName="square-check" class="text-gray-500" />
    {:else}
      <TablerIcon iconName="square" class="text-gray-500" />
    {/if}
  </button>
  <span
    bind:this="{titleEl}"
    class="title"
    class:editable="{editmode}"
    contenteditable="{editmode}"
    on:dblclick="{() => !editmode && toggleEditor()}"
    on:input
  >
    {title}
  </span>
  <div class="options">
    {#if editmode}
      <button type="button" class="save-button" on:click="{() => dispatch('save')}">
        <TablerIcon iconName="circle-check" />
      </button>
      <button type="button" class="cancel-button" on:click="{() => dispatch('cancel')}">
        <TablerIcon iconName="circle-x" />
      </button>
    {:else}
      <button type="button" class="delete-button" on:click="{() => dispatch('delete')}">
        <TablerIcon iconName="trash" class="text-gray-500" />
      </button>
    {/if}
  </div>
</div>
