<script>
  import actionable from "./actionable";
  export let checked;
</script>

<style>
  svg:focus rect {
    stroke: #6ca1f8;
  }
</style>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="flex-none w-8 h-8 mt-2 mr-2 group focus:outline-none"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  use:actionable="{'toggle'}"
  on:action
>
  {#if checked}
    <rect
      fill="currentColor"
      class="text-gray-200"
      stroke=""
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
    ></rect>
    <path class="text-gray-600" d="M9 12l2 2l4 -4"></path>
  {:else}
    <path
      class="text-gray-300 transition-opacity duration-150 ease-out opacity-0 group-hover:opacity-100"
      d="M9 12l2 2l4 -4"
    ></path>
    <rect x="4" y="4" class="text-gray-400" width="16" height="16" rx="2"></rect>
  {/if}
</svg>
