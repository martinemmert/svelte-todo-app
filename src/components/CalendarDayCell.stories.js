import CalendarDayCell from "./CalendarDayCell.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | Calendar / CalendarDayCell",
  component: CalendarDayCell,
  decorators: [Centered]
};

export const Default = () => ({
  Component: CalendarDayCell,
  props: {}
});

export const Today = () => ({
  Component: CalendarDayCell,
  props: {
    today: true
  }
});

export const Selected = () => ({
  Component: CalendarDayCell,
  props: {
    selected: true
  }
});

export const TodayAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    today: true,
    selected: true
  }
});

export const NotCurrentMonth = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false
  }
});

export const NotCurrentMonthAndToday = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    today: true
  }
});

export const NotCurrentMonthAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    selected: true
  }
});

export const NotCurrentMonthAndTodayAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    selected: true,
    today: true
  }
});

export const Disabled = () => ({
  Component: CalendarDayCell,
  props: {
    disabled: true
  }
});
