import TextField from "./TextField.svelte";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

export default {
  title: "MVP | Task List Item / TextField",
  component: TextField,
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: TextField,
  props: {
    editable: false,
    value: "some value",
  },
  on: {},
});

export const Editable = () => ({
  Component: TextField,
  props: {
    editable: true,
    value: "some value",
  },
  on: {},
});

export const Interactive = () => ({
  Component: TextField,
  props: {
    editable: boolean("editable", false, "props"),
    value: text("value", "some value", "props"),
  },
  on: {},
});
