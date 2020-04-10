import NavBar from "./NavBar";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components | NavBar",
  component: NavBar,
};

export const Default = () => ({
  Component: NavBar,
  on: {
    action: event => action("action")(event.detail),
  },
});
