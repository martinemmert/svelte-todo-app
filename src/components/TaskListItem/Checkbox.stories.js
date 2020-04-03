import Checkbox from "./Checkbox";

export default {
  title: "MVP | Task List Item / Checkbox",
  component: Checkbox,
};

export const Default = () => ({
  Component: Checkbox,
  props: {
    checked: false,
  },
  on: {},
});

export const Checked = () => ({
  Component: Checkbox,
  props: {
    checked: true,
  },
  on: {},
});
