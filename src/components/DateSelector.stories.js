import DateSelector from "./DateSelector.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | Todo Item / Date Selector",
  component: DateSelector,
  decorators: [Centered]
};

export const NoValueSet = () => ({
  Component: DateSelector,
  props: {}
});

export const Value = () => ({
  Component: DateSelector,
  props: {
    value: '2020-03-14'
  }
});
