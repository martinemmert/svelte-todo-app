<script>
  import { FlagIcon } from "svelte-feather-icons";
  import cx from "classnames";
  let cn;
  export let checked = false;
  export { cn as class };
</script>

<label
  class={cx('relative flex items-center p-2 transition-colors duration-150 rounded cursor-pointer hover:bg-red-200', cn)}>
  {#if checked}
    <FlagIcon class="w-4 h-4 text-red-600 transition-colors duration-150" />
  {:else}
    <FlagIcon
      class="w-4 h-4 text-gray-400 transition-colors duration-150 group-hover:text-red-600" />
  {/if}
  <input type="checkbox" bind:checked on:change class="hidden" />
</label>
