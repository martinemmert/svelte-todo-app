import PrioritySwitch from "./PrioritySwitch.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | Todo Item / Priority Switch",
  component: PrioritySwitch,
  decorators: [Centered]
};

export const Unchecked = () => ({
  Component: PrioritySwitch
});

export const Checked = () => ({
  Component: PrioritySwitch,
  props: {
    checked: true
  }
});
