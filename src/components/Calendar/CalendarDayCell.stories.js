import CalendarDayCell from "./CalendarDayCell.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "Components | Calendar / CalendarDayCell",
  component: CalendarDayCell,
  decorators: [Centered],
};

export const Default = () => ({
  Component: CalendarDayCell,
  props: {
    value: "01",
  },
});

export const Today = () => ({
  Component: CalendarDayCell,
  props: {
    today: true,
    value: "01",
  },
});

export const Selected = () => ({
  Component: CalendarDayCell,
  props: {
    selected: true,
    value: "01",
  },
});

export const TodayAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    today: true,
    selected: true,
    value: "01",
  },
});

export const NotCurrentMonth = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    value: "01",
  },
});

export const NotCurrentMonthAndToday = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    today: true,
    value: "01",
  },
});

export const NotCurrentMonthAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    selected: true,
    value: "01",
  },
});

export const NotCurrentMonthAndTodayAndSelected = () => ({
  Component: CalendarDayCell,
  props: {
    currentMonth: false,
    selected: true,
    today: true,
    value: "01",
  },
});

export const Disabled = () => ({
  Component: CalendarDayCell,
  props: {
    disabled: true,
    value: "01",
  },
});
