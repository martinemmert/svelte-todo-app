<script>
  import InlinePopUp from "./InlinePopUp.svelte";
  let open = false;
</script>

<label class="fixed">
  <input type="checkbox" bind:checked={open} />
  open
</label>

{#if open}
  <InlinePopUp bind:open on:clickoutside={() => (open = false)}>
    child goes here
  </InlinePopUp>
{/if}
