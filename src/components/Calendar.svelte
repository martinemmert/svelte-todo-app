<script context="module">
  import i18n from "../i18n";
  const wd = new Date();
  wd.setHours(0, 0, 0, 0);
  const THIS_YEAR = wd.getFullYear();

  export function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  export function getDaysOfMonth(month, year = THIS_YEAR) {
    switch (month) {
      case 3: // april
      case 5: // june
      case 8: // september
      case 10: // november
        return 30;
      case 1: // february
        return isLeapYear(year) ? 29 : 28;
      default:
        // january, march, may, july, august, october, december
        return 31;
    }
  }

  export function getFirstDayOfMonth(month, year = THIS_YEAR) {
    wd.setFullYear(year, month, 1);
    return wd.getDay() - 1 < 0 ? 6 : wd.getDay() - 1;
  }

  export function getCalendarSheet(month, year = THIS_YEAR) {
    const prevMonth = month == 0 ? 11 : month - 1;
    const nextMonth = month == 11 ? 0 : month + 1;
    const daysOfMonth = getDaysOfMonth(month, year);
    const daysOfPrevMonth = getDaysOfMonth(prevMonth, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const cells = [];

    // prev month
    for (let i = firstDay; i > 0; i--) {
      const cell = {
        date: daysOfPrevMonth - i + 1,
        month: prevMonth,
        year: prevMonth == 11 ? year - 1 : year
      };
      cell.dateObj = new Date(cell.year, cell.month, cell.date, 0, 0, 0, 0);
      cell.time = cell.dateObj.getTime();
      cells.push(cell);
    }

    // current month
    for (let i = 0; i < daysOfMonth; i++) {
      const cell = { date: i + 1, month, year };
      cell.dateObj = new Date(cell.year, cell.month, cell.date, 0, 0, 0, 0);
      cell.time = cell.dateObj.getTime();
      cells.push(cell);
    }

    // next month
    for (let i = cells.length; i < 42; i++) {
      const cell = {
        date: (i % daysOfMonth) - firstDay + 1,
        month: nextMonth,
        year: nextMonth == 0 ? year + 1 : year
      };
      cell.dateObj = new Date(cell.year, cell.month, cell.date, 0, 0, 0, 0);
      cell.time = cell.dateObj.getTime();
      cells.push(cell);
    }

    return cells;
  }

  export function dateWithinDateRange(date, min, max) {
    if (min && date < min) return false;
    if (max && date > max) return false;
    return true;
  }

  export function parseDateToDateValueString(dateObj) {
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let date = dateObj.getDate();
    date = date < 10 ? "0" + date : date;
    return `${dateObj.getFullYear()}-${month}-${date}`;
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import { ChevronsLeftIcon, ChevronsRightIcon } from "svelte-feather-icons";
  import CalendarDayCell from "./CalendarDayCell.svelte";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  export let minDate;
  export let maxDate;
  export let selectedDate;

  if (selectedDate) selectedDate.setHours(0, 0, 0, 0);

  let currentYear = (selectedDate || today).getFullYear();
  let currentMonth = (selectedDate || today).getMonth();
  let cells = getCalendarSheet(currentMonth, currentYear);

  const value = writable(
    selectedDate ? parseDateToDateValueString(selectedDate) : undefined
  );

  const dispatch = createEventDispatcher();

  function gotoPrevMonth() {
    currentMonth = currentMonth == 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth == 11 ? currentYear - 1 : currentYear;
    cells = getCalendarSheet(currentMonth, currentYear);
  }

  function gotoCurrentMonth() {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    cells = getCalendarSheet(currentMonth, currentYear);
  }

  function gotoNextMonth() {
    currentMonth = currentMonth == 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth == 0 ? currentYear + 1 : currentYear;
    cells = getCalendarSheet(currentMonth, currentYear);
  }

  value.subscribe(value => {
    if (value) {
      const [year, month] = value.split("-");
      if (currentMonth !== month - 1 || currentYear !== year) {
        currentMonth = month - 1;
        currentYear = year;
        cells = getCalendarSheet(currentMonth, currentYear);
      }
    }
    dispatch("change", value);
  });
</script>

<time datetime={`${currentYear}`}>
  <time datetime={`${currentYear}-${currentMonth + 1}`}>
    <header class="text-sm text-center">
      {i18n.datetime.month[currentMonth].long} {currentYear}
    </header>
    <nav class="flex items-center justify-between my-2 text-sm">
      <button
        on:click={gotoPrevMonth}
        class="block p-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
        disabled={minDate && (currentMonth <= minDate.getMonth() && currentYear <= minDate.getFullYear())}>
        <ChevronsLeftIcon class="w-4 h-4" />
      </button>
      <button on:click={gotoCurrentMonth}>Today</button>
      <button
        on:click={gotoNextMonth}
        class="block p-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
        disabled={maxDate && currentMonth >= maxDate.getMonth() && currentYear >= maxDate.getFullYear()}>
        <ChevronsRightIcon class="w-4 h-4" />
      </button>
    </nav>
    <section class="grid grid-cols-7 gap-2">
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[0].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[1].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[2].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[3].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[4].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[5].short}
      </span>
      <span class="text-sm font-semibold text-center">
        {i18n.datetime.weekday[6].short}
      </span>
      {#each cells as cell (cell)}
        <CalendarDayCell
          class="relative overflow-hidden focus-within:text-red-500"
          date={cell.dateObj}
          disabled={!dateWithinDateRange(cell.dateObj, minDate, maxDate)}
          selected={$value === parseDateToDateValueString(cell.dateObj)}
          today={today.getTime() === cell.time}
          currentMonth={cell.month === currentMonth}
          title={i18n.formatter.date.short.format(cell.dateObj)}>
          <input
            type="radio"
            title={i18n.formatter.date.short.format(cell.dateObj)}
            bind:group={$value}
            class="hidden"
            disabled={!dateWithinDateRange(cell.dateObj, minDate, maxDate)}
            value={parseDateToDateValueString(cell.dateObj)} />
        </CalendarDayCell>
      {/each}
    </section>
  </time>
</time>
