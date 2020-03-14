<script>
  import { CalendarIcon } from "svelte-feather-icons";
  import Calendar from "./Calendar.svelte";
  import InlinePopUp from "./InlinePopUp.svelte";
  import i18n from "../i18n";

  export let value;
  export let min;
  export let max;

  let open = false;
  let button;

  function changeHandler(event) {
    const { detail } = event;
    if (detail) {
      const [year, month, date] = detail.split("-");
      const newDate = new Date(year, month - 1, date, 0, 0, 0, 0);
      value = newDate;
    } else {
      value = undefined;
    }
    open = false;
  }
</script>

<button
  bind:this={button}
  class="relative flex items-center px-2 py-1 transition-colors duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none hover:text-gray-200 hover:bg-gray-600"
  class:bg-gray-600={value}
  class:text-gray-200={value}
  class:text-gray-600={!value}
  on:click|preventDefault={() => (open = true)}>
  <CalendarIcon class="block w-4 h-4 mb-0.5" />
  {#if value}
    <span class="pl-1 mt-px text-xs">
      {i18n.formatter.date.short.format(value)}
    </span>
  {/if}
</button>
{#if open}
  <InlinePopUp
    bind:open
    on:clickoutside={() => (open = false)}
    exclude={[button]}>
    <Calendar
      selectedDate={value}
      minDate={min}
      maxDate={max}
      on:change={changeHandler} />
  </InlinePopUp>
{/if}
