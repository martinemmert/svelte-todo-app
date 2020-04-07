import NavBar from "./NavBar";
import { action } from "@storybook/addon-actions";

export default {
  title: "MVP | Nav Bar",
  component: NavBar,
};

export const Default = () => ({
  Component: NavBar,
  on: {
    action: event => action("action")(event.detail),
  },
});
