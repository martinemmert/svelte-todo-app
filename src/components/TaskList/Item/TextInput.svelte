<script context="module">
  const TF_CLASS_NAMES_DEFAULT =
    "block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded focus:outline-none transition transition-colors duration-150 ease-out";
  const TF_CLASS_NAMES_EDITABLE = `${TF_CLASS_NAMES_DEFAULT} appearance-none text-gray-800 cursor-text bg-gray-100 border-gray-400`;
</script>

<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";
  import clickoutside from "~actions/clickoutside";
  import TablerIcon from "~components/TablerIcon";

  export let title;

  let value = title;

  let refInput;
  let refOptions;

  const dispatch = createEventDispatcher();

  onMount(() => {
    refInput.focus();
  });
</script>

<input
  bind:this="{refInput}"
  type="text"
  class="{TF_CLASS_NAMES_EDITABLE}"
  bind:value
  use:clickoutside="{{ exclude: refOptions }}"
  on:clickoutside="{() => dispatch('cancel')}"
  on:keydown="{event => {
    if (event.key === 'Enter') dispatch('commit', { title: value });
    if (event.key === 'Escape') dispatch('cancel');
  }}"
/>
<ul bind:this="{refOptions}" class="flex flex-row items-center mt-2">
  <li class="block ml-2 text-teal-500" on:click="{() => dispatch('commit', { title: value })}">
    <TablerIcon iconName="circle-check" class="w-8 h-8" />
  </li>
  <li class="block ml-2 text-gray-500" on:click="{() => dispatch('cancel')}">
    <TablerIcon iconName="circle-x" class="w-8 h-8" />
  </li>
</ul>
