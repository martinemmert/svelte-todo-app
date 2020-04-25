import TaskListItem from "./TaskListItem.svelte";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components | TaskList / TaskListItem",
  component: TaskListItem,
  decorators: [withKnobs],
};

export const Pending = () => ({
  Component: TaskListItem,
  props: {
    title: "some value",
    isCompleted: false,
  },
  on: {
    action: (event) => action("action")(event.detail),
  },
});

export const Editing = () => ({
  Component: TaskListItem,
  props: {
    title: "some value",
    isCompleted: false,
    isEditModeEnabled: true,
  },
  on: {
    action: (event) => action("action")(event.detail),
  },
});

export const Completed = () => ({
  Component: TaskListItem,
  props: {
    title: "some value",
    isCompleted: true,
  },
  on: {
    action: (event) => action("action")(event.detail),
  },
});
