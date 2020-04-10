import Calendar from "./Calendar.svelte";
import { action } from "@storybook/addon-actions";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "Components | Calendar",
  component: Calendar,
  decorators: [Centered],
};

const minDate = "2020-02-10";
const maxDate = "2020-02-20";

const changeHandler = action("on:change");

export const NoDateSelected = () => ({
  Component: Calendar,
  props: {},
  on: {
    change: event => changeHandler(event.detail),
  },
});

export const DateSelected = () => ({
  Component: Calendar,
  props: {
    selectedDate: "2020-02-12",
  },
  on: {
    change: event => changeHandler(event.detail),
  },
});

export const MinDateSet = () => ({
  Component: Calendar,
  props: {
    minDate,
  },
  on: {
    change: event => changeHandler(event.detail),
  },
});

export const MaxDateSet = () => ({
  Component: Calendar,
  props: {
    maxDate,
  },
  on: {
    change: event => changeHandler(event.detail),
  },
});

export const MinMaxDateSet = () => ({
  Component: Calendar,
  props: {
    minDate,
    maxDate,
  },
  on: {
    change: event => changeHandler(event.detail),
  },
});
