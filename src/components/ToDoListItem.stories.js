import ToDoListItem from "./ToDoListItem.svelte";
import { action } from "@storybook/addon-actions";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | ToDo Item",
  component: ToDoListItem,
  decorators: [Centered]
};

const minimalItem = {
  id: 1,
  text: "Todo Item without any further details",
  createdOn: "2020-03-01",
  completed: false
};

const todo = minimalItem;
const todo1 = { ...minimalItem, dueDate: "2020-03-01" };
const todo2 = { ...minimalItem, completed: true };
const todo3 = { ...minimalItem, priority: true };
const todo4 = { ...minimalItem, priority: true, dueDate: "2020-03-01" };

const handler = {
  delete: action("on:delete"),
  toggle: action("on:toggle"),
  changeDueDate: action("on:changeDueDate"),
  changePriority: action("on:changePriority")
};

export const Default = () => ({
  Component: ToDoListItem,
  title: "default",
  props: { ...todo },
  on: { ...handler }
});

export const PrioritySet = () => ({
  Component: ToDoListItem,
  props: { ...todo3 },
  on: { ...handler }
});

export const DueDateSet = () => ({
  Component: ToDoListItem,
  props: { ...todo1 },
  on: { ...handler }
});

export const PriorityAndDueDateSet = () => ({
  Component: ToDoListItem,
  props: { ...todo4 },
  on: { ...handler }
});

export const Checked = () => ({
  Component: ToDoListItem,
  props: { ...todo2 },
  on: { ...handler }
});



