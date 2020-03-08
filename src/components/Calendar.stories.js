import Calendar from "./Calendar.svelte";
import { action } from "@storybook/addon-actions";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | Calendar",
  component: Calendar,
  decorators: [Centered]
};

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);
const maxDate = new Date(2020, 2, 10, 0, 0, 0, 0);

const changeHandler = action("on:change");

export const NoDateSelected = () => ({
  Component: Calendar,
  props: {},
  on: {
    change: event => changeHandler(event.detail)
  }
});

export const DateSelected = () => ({
  Component: Calendar,
  props: {
    selectedDate: new Date(2020, 2, 8)
  },
  on: {
    change: event => changeHandler(event.detail)
  }
});

export const MinDateSet = () => ({
  Component: Calendar,
  props: {
    minDate
  },
  on: {
    change: event => changeHandler(event.detail)
  }
});

export const MaxDateSet = () => ({
  Component: Calendar,
  props: {
    maxDate
  },
  on: {
    change: event => changeHandler(event.detail)
  }
});

export const MinMaxDateSet = () => ({
  Component: Calendar,
  props: {
    minDate,
    maxDate
  },
  on: {
    change: event => changeHandler(event.detail)
  }
});
