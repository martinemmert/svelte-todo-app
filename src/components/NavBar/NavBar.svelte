<script>
  import { createEventDispatcher } from "svelte";
  import TablerIcon from "~components/TablerIcon";

  const dispatch = createEventDispatcher();
</script>

<style>
  .logo {
    top: 8px;
    height: 5.5rem;
  }
</style>

<header class="sticky top-0 flex items-center h-20 bg-gray-800">
  <img src="/assets/Logo.svg" alt="fini logo" class="relative block ml-12 logo" />
  <nav class="ml-auto mr-8">
    <button
      class="text-gray-200 transition-opacity duration-150 ease-out opacity-50 hover:opacity-100"
      on:click="{() => dispatch('action', { action: 'power' })}"
    >
      <TablerIcon iconName="power" class="w-8 h-8" />
    </button>
  </nav>
</header>
