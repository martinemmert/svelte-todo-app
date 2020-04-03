import TaskListItem from "./TaskListItem.svelte";
import { action } from "@storybook/addon-actions";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "MVP | Task List Item",
  component: TaskListItem,
  // decorators: [Centered],
};

const item = {
  id: 1,
  title: "Item without any further details",
  createdOn: "2020-03-01",
  completed: true,
};

export const Default = () => ({
  Component: TaskListItem,
  props: {
    ...item,
  },
  on: {
    check: action("check"),
    change: action("change"),
  },
});
