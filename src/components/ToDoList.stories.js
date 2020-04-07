import ToDoList from "./ToDoList.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | ToDoList",
  component: ToDoList,
  decorators: [Centered],
};

const minimalItem = {
  id: 1,
  text: "Todo Item without any further details",
  createdOn: "2020-03-01",
  completed: false,
};

const todo = minimalItem;
const todo1 = { ...minimalItem, dueDate: "2020-03-01" };
const todo2 = { ...minimalItem, completed: true };
const todo3 = { ...minimalItem, priority: true };
const todo4 = { ...minimalItem, priority: true, dueDate: "2020-03-01" };

export const Default = () => ({
  Component: ToDoList,
  props: {
    items: [todo, todo1, todo2, todo3, todo4],
  },
});
