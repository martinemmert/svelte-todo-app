import Task from "./Task";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "MVP | Task List Item / Task",
  component: Task,
  decorators: [withKnobs],
};

export const Idle = () => ({
  Component: Task,
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
  Component: Task,
  props: {
    title: "some value",
    state: "edit-mode",
  },
  on: {
    action: event => action("action")(event.detail),
  },
});

export const Complete = () => ({
  Component: Task,
  props: {
    title: "some value",
    state: "task-completed",
  },
  on: {
    action: event => action("action")(event.detail),
  },
});
