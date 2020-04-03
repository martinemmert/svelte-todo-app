<script>
  import { createEventDispatcher, afterUpdate } from "svelte";
  import actionable from "./actionable";
  export let value = "";
  export let editable = false;
  export let completed = false;

  $: cn = [
    // sizing
    "px-4",
    "py-2",
    "w-full",
    // text
    "font-serif",
    "font-book",
    "text-base",
    !completed && "text-gray-800",
    completed && "text-gray-500",
    completed && "line-through",
    "leading-normal",
    // background
    editable && "bg-gray-100",
    // border
    "border",
    !editable && "border-transparent",
    editable && "border-gray-400",
    "focus:outline-none",
    "focus:border-blue-400",
    "rounded",
    // transition
    "transition",
    "transition-colors",
    "duration-150",
    "ease-out",
    // cursor
    !editable && "select-none",
    !completed && "cursor-text",
    completed && "cursor-default",
    $$props.class,
  ]
    .filter(v => !!v)
    .join(" ");
</script>

{#if editable && !completed}
  <p contenteditable bind:textContent="{value}" class="{cn}">{value}</p>
{:else}
  <p use:actionable="{'edit'}" on:action class="{cn}">{value}</p>
{/if}
