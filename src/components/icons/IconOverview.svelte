<script>
  import * as Icons from "./index";
</script>

<div class="grid grid-cols-6">
  {#each Object.entries(Icons) as [key, Icon]}
    <div class="flex flex-col items-center p-4">
      <Icon class="w-6 h-6" />
      <span class="mt-4 text-xs text-center">{key}</span>
    </div>
  {/each}
</div>
