<script context="module">
  import invariant from "invariant";
  import i18n from "~i18n";
  const wd = new Date();
  wd.setHours(0, 0, 0, 0);
  const THIS_YEAR = wd.getFullYear();

  export function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  export function leftPad(value) {
    return value < 10 ? `0${value}` : value;
  }

  export function splitDateString(str) {
    return str ? str.split("-") : [];
  }

  export function getDaysOfMonth(month, year = THIS_YEAR) {
    switch (month) {
      case 4: // april
      case 6: // june
      case 9: // september
      case 11: // november
        return 30;
      case 2: // february
        return isLeapYear(year) ? 29 : 28;
      default:
        // january, march, may, july, august, october, december
        return 31;
    }
  }

  export function getFirstDayOfMonth(month, year = THIS_YEAR) {
    wd.setFullYear(year, month - 1, 1);
    return wd.getDay() - 1 < 0 ? 6 : wd.getDay() - 1;
  }

  export function getCalendarSheet(month, year = THIS_YEAR) {
    const prevMonth = month == 0 ? 12 : month - 1;
    const nextMonth = month == 12 ? 0 : month + 1;
    const daysOfMonth = getDaysOfMonth(month, year);
    const daysOfPrevMonth = getDaysOfMonth(prevMonth, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const cells = [];

    // prev month
    for (let i = firstDay; i > 0; i--) {
      const cell = {
        date: daysOfPrevMonth - i + 1,
        month: prevMonth,
        year: prevMonth == 12 ? year - 1 : year,
      };
      cell.time = wd.setFullYear(cell.year, cell.month, cell.date);
      cell.value = `${cell.year}-${leftPad(cell.month)}-${leftPad(cell.date)}`;
      cells.push(cell);
    }

    // current month
    for (let i = 0; i < daysOfMonth; i++) {
      const cell = { date: i + 1, month, year };
      cell.time = wd.setFullYear(cell.year, cell.month, cell.date);
      cell.value = `${cell.year}-${leftPad(cell.month)}-${leftPad(cell.date)}`;
      cells.push(cell);
    }

    // next month
    for (let i = cells.length; i < 42; i++) {
      const cell = {
        date: (i % daysOfMonth) - firstDay + 1,
        month: nextMonth,
        year: nextMonth == 1 ? year + 1 : year,
      };
      cell.time = wd.setFullYear(cell.year, cell.month, cell.date);
      cell.value = `${cell.year}-${leftPad(cell.month)}-${leftPad(cell.date)}`;
      cells.push(cell);
    }

    return cells;
  }

  export function dateWithinDateRange(date, min, max) {
    if (min && date < min) return false;
    if (max && date > max) return false;
    return true;
  }

  export function parseDateToDateString(dateObj) {
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    return `${dateObj.getFullYear()}-${leftPad(month)}-${leftPad(date)}`;
  }

  export function parseDateStringToDate(dateStr) {
    invariant(isDateString(dateStr), getErrorMessage("dateStr"));
    return new Date(...dateStr.split("-"));
  }

  export function isDateString(str) {
    return (
      typeof str === "string" &&
      !!str.match(
        /^[1-2][0-9]{3}-(?:0(?=[1-9])[1-9]|1(?=[0-2])[0-2])-(?:0(?=[1-9])[1-9]|[1-2](?=[0-9])[0-9]|3(?=[0-1])[0-1])$/,
      )
    );
  }

  function getDateStringErrorMessage(valName) {
    return `The value of '${valName}'' is not a string or does not match the format YYYY-MM-DD.`;
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import { ChevronsLeftIcon, ChevronsRightIcon, XCircleIcon } from "svelte-feather-icons";
  import CalendarDayCell from "./CalendarDayCell.svelte";

  const today = new Date();

  export let minDate;
  export let maxDate;
  export let selectedDate;

  if (minDate) invariant(isDateString(minDate), getDateStringErrorMessage("minDate"));

  if (maxDate) invariant(isDateString(maxDate), getDateStringErrorMessage("maxDate"));

  if (selectedDate)
    invariant(isDateString(selectedDate), getDateStringErrorMessage("selectedDate"));

  let [currentYear, currentMonth] = selectedDate
    ? selectedDate.split("-")
    : [today.getFullYear(), today.getMonth() + 1];

  const [minDateYear, minDateMonth, minDateDate] = splitDateString(minDate);
  const [maxDateYear, maxDateMonth, maxDateDate] = splitDateString(maxDate);

  const minDateTime = minDate ? wd.setFullYear(minDateYear, minDateMonth, minDateDate) : 0;

  const maxDateTime = maxDate
    ? wd.setFullYear(maxDateYear, maxDateMonth, maxDateDate)
    : Number.MAX_SAFE_INTEGER;

  const value = writable(selectedDate);
  const dispatch = createEventDispatcher();

  function gotoPrevMonth() {
    currentMonth = currentMonth == 1 ? 12 : currentMonth - 1;
    currentYear = currentMonth == 12 ? currentYear - 1 : currentYear;
  }

  function gotoCurrentMonth() {
    currentMonth = today.getMonth() + 1;
    currentYear = today.getFullYear();
  }

  function gotoNextMonth() {
    currentMonth = currentMonth == 12 ? 0 : currentMonth + 1;
    currentYear = currentMonth == 1 ? currentYear + 1 : currentYear;
  }

  value.subscribe(value => {
    if (value) {
      let [year, month] = splitDateString(value);
      year = parseFloat(year);
      month = parseFloat(month);
      if (currentMonth !== month || currentYear !== year) {
        currentMonth = month;
        currentYear = year;
      }
    }
    dispatch("change", value);
  });

  $: cells = getCalendarSheet(currentMonth, currentYear);
</script>

<time class="block" datetime="{`${currentYear}`}">
  <time class="block" datetime="{`${currentYear}-${currentMonth + 1}`}">
    <header class="text-sm text-center">
      {i18n.datetime.month[currentMonth - 1].long} {currentYear}
    </header>
    <nav class="flex items-center justify-between my-2 text-sm">
      <button
        on:click="{gotoPrevMonth}"
        class="block p-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
        disabled="{minDate && currentMonth <= minDateMonth && currentYear <= minDateYear}"
      >
        <ChevronsLeftIcon class="w-4 h-4" />
      </button>
      <button on:click="{gotoCurrentMonth}">Today</button>
      <button
        on:click="{gotoNextMonth}"
        class="block p-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
        disabled="{maxDate && currentMonth >= maxDateMonth && currentYear >= maxDateYear}"
      >
        <ChevronsRightIcon class="w-4 h-4" />
      </button>
    </nav>
    <section class="grid grid-cols-7 gap-2">
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[0].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[1].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[2].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[3].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[4].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[5].short}</span>
      <span class="text-sm font-semibold text-center">{i18n.datetime.weekday[6].short}</span>
      {#each cells as cell (cell)}
        <CalendarDayCell
          class="relative overflow-hidden focus-within:text-red-500"
          value="{cell.date}"
          disabled="{!dateWithinDateRange(cell.time, minDateTime, maxDateTime)}"
          selected="{$value === cell.value}"
          today="{today.getTime() === cell.time}"
          currentMonth="{cell.month === currentMonth}"
          title="{cell.value}"
        >
          <input
            type="radio"
            title="{cell.value}"
            bind:group="{$value}"
            class="hidden"
            disabled="{!dateWithinDateRange(cell.time, minDateTime, maxDateTime)}"
            value="{cell.value}"
          />
        </CalendarDayCell>
      {/each}
    </section>
  </time>
  <footer class="pt-3 mt-4 border-t border-gray-400">
    <button
      type="button"
      class="flex items-center px-2 py-1 mx-auto text-gray-500 transition-colors duration-150 ease-out border rounded focus:outline-none hover:text-gray-800 hover:border-gray-800"
      on:click="{() => {
        if ($value !== undefined) {
          $value = undefined;
        } else {
          dispatch('change');
        }
      }}"
    >
      <XCircleIcon class="w-4 h-4 mr-2" />
      <span class="text-sm">Clear</span>
    </button>
  </footer>
</time>
