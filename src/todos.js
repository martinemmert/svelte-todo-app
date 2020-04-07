import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export const PRIORITY = {
  PRIMARY: 4,
  SECONDARY: 3,
  TERTIARY: 1,
  NONE: 0,
};

const data = localStorage.getItem("todos");
const initialData = data ? JSON.parse(data) : {};
const todos = writable(initialData);

function add(text) {
  const id = uuid();

  todos.update(current => ({
    ...current,
    [id]: {
      id,
      text,
      createdOn: new Date().toISOString(),
      completed: false,
      priority: PRIORITY.NONE,
    },
  }));
}

function remove(id) {
  todos.update(current => {
    // eslint-disable-next-line no-unused-vars
    const { [id]: unused, ...rest } = current;
    return rest;
  });
}

function toggle(id) {
  todos.update(current => {
    if (current[id]) {
      const updatedItem = {
        ...current[id],
        completed: !current[id].completed,
        completedOn: !current[id].completed ? new Date().toISOString() : undefined,
      };
      return { ...current, [id]: updatedItem };
    }
    return current;
  });
}

function setText(id, text) {
  todos.update(current => {
    if (current[id]) {
      const updatedItem = { ...current[id], text };
      return { ...current, [id]: updatedItem };
    }
    return current;
  });
}

function setDueDate(id, dueDate) {
  todos.update(current => {
    if (current[id]) {
      const updatedItem = { ...current[id], dueDate };
      return { ...current, [id]: updatedItem };
    }
    return current;
  });
}

function setPriority(id, priority) {
  todos.update(current => {
    if (current[id]) {
      const updatedItem = { ...current[id], priority };
      return { ...current, [id]: updatedItem };
    }
    return current;
  });
}

todos.subscribe(val => {
  if (Object.keys(val).length < 1) {
    localStorage.removeItem("todos");
  } else {
    localStorage.setItem("todos", JSON.stringify(val));
  }
});

export default {
  subscribe: todos.subscribe,
  add,
  remove,
  toggle,
  setText,
  setDueDate,
  setPriority,
};
