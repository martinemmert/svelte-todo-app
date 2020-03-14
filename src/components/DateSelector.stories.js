import DateSelector from "./DateSelector.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | DateSelector",
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
    value: new Date()
  }
});
