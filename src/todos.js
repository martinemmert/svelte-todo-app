import { writable } from "svelte/store";

export const PRIORITY = {
  PRIMARY: 4,
  SECONDARY: 3,
  TERTIARY: 1,
  NONE: 0,
};

const data = localStorage.getItem("todos");
const initialData = data ? JSON.parse(data) : {};
const todos = writable(initialData);

let nextId = data ? Object.keys(initialData).pop() : 0;

function add(text) {
  todos.update(current => ({
    ...current,
    [++nextId]: {
      id: nextId,
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
  setDueDate,
  setPriority,
};
