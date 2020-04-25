<script context="module">
  const SVG_CLASS_NAME = "flex-none w-8 h-8 mt-2 mr-2 cursor-pointer focus:outline-none";
</script>

<script>
  export let checked = false;
</script>

<style>
  .stroked {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2px;
  }

  .filled {
    fill: currentColor;
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" class="{SVG_CLASS_NAME}" viewBox="0 0 24 24" on:click>
  {#if checked}
    <rect x="4" y="4" width="16" height="16" rx="3" class="text-gray-200 stroked filled"></rect>
    <path class="text-gray-600 stroked" d="M9 12l2 2l4 -4"></path>
  {:else}
    <rect x="4" y="4" width="16" height="16" rx="3" class="text-gray-400 stroked"></rect>
  {/if}
</svg>
