import List from "./TaskList.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components | TaskList",
  component: List,
};

const tasks = [
  { id: "1", title: "Buy some Milk" },
  { id: "2", title: "Feed the Cat", state: "edit-mode" },
  { id: "3", title: "Workout", state: "task-completed" },
  { id: "4", title: "Relax" },
];

export const Empty = () => ({
  Component: List,
  props: {},
  on: {
    add: action("add"),
    action: event => action("action")(event.detail),
  },
});

export const NotEmpty = () => ({
  Component: List,
  props: {
    tasks,
  },
  on: {
    add: action("add"),
    action: event => action("action")(event.detail),
  },
});
