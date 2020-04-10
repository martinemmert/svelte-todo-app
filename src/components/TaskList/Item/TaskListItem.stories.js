import TaskListItem from "./TaskListItem.svelte";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components | TaskList / TaskListItem",
  component: TaskListItem,
  decorators: [withKnobs],
};

export const Idle = () => ({
  Component: TaskListItem,
  props: {
    completed: false,
    title: "some value",
    state: "idle",
  },
  on: {
    action: event => action("action")(event.detail),
  },
});

export const Edit = () => ({
  Component: TaskListItem,
  props: {
    title: "some value",
    state: "edit-mode",
  },
  on: {
    action: event => action("action")(event.detail),
  },
});

export const Complete = () => ({
  Component: TaskListItem,
  props: {
    title: "some value",
    state: "task-completed",
  },
  on: {
    action: event => action("action")(event.detail),
  },
});
