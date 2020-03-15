<script>
  import { Trash2Icon } from "svelte-feather-icons";
  import cx from "classnames";
  let cn;
  export { cn as class };
</script>

<button
  type="button"
  on:click
  class={cx('relative flex items-center p-2 transition-colors duration-150  rounded cursor-pointer hover:bg-gray-400', cn)}>
  <Trash2Icon
    class="w-4 h-4 text-gray-400 transition-colors duration-150 group-hover:text-gray-700" />
</button>
