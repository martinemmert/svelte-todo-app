<script>
  import { createEventDispatcher } from "svelte";
  import { CalendarIcon } from "svelte-feather-icons";
  import { IconCalendar, IconCalendarToday } from "./icons";
  import Calendar from "./Calendar.svelte";
  import dayjs from "dayjs";
  import InlinePopUp from "./InlinePopUp.svelte";
  import i18n from "../i18n";
  import cx from "classnames";

  let cn;
  export let value;
  export let min;
  export let max;
  export { cn as class };

  let open = false;
  let button;

  const dispatch = createEventDispatcher();

  function changeHandler(event) {
    const { detail } = event;
    value = detail ? detail : undefined;
    open = false;
    dispatch("change", value);
  }
</script>

<div class="relative">
  <button
    bind:this={button}
    class={cx('relative flex items-center p-2 text-blue-500 transition-colors duration-150  rounded cursor-pointer focus:outline-none hover:text-blue-600 hover:bg-blue-200', cn)}
    on:click|preventDefault={() => (open = true)}>
    {#if value}
      <CalendarIcon
        class="w-4 h-4 text-blue-600 transition-colors duration-150" />
      <span class="pl-1 mt-px text-xs leading-none">
        {i18n.formatter.date.short.format(dayjs(value))}
      </span>
    {:else}
      <CalendarIcon
        class="w-4 h-4 text-gray-400 transition-colors duration-150 group-hover:text-blue-600" />
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
</div>
