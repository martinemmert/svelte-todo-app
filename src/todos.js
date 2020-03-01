import { writable } from "svelte/store";

const data = localStorage.getItem("todos");
const initialData = data ? JSON.parse(data) : {};
const todos = writable(initialData);

let nextId = data ? Object.keys(initialData).pop() : 0;

function add(text) {
  todos.update(current => ({
    ...current,
    [++nextId]: { id: nextId, text, completed: false }
  }));
}

function remove(id) {
  todos.update(current => {
    const { [id]: unused, ...rest } = current;
    return rest;
  });
}

function toggle(id) {
  todos.update(current => {
    if (current[id]) {
      const updatedItem = {
        ...current[id],
        completed: !current[id].completed
      };
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
  toggle
};
