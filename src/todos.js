import { writable } from "svelte/store";

const data = localStorage.getItem("todos");
const initialData = data ? JSON.parse(data) : {};
const todos = writable(initialData);

let nextId = data ? Object.keys(initialData).pop() : 0;

function add(text) {
  todos.update(current => ({
    ...current,
    [++nextId]: { id: nextId, text, done: false }
  }));
}

function remove(id) {
  todos.update(current => {
    const { [id]: unused, ...rest } = current;
    return rest;
  });
}

function toggle(id, done) {
  todos.update(current => {
    if (current[id]) current[id].done = done;
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
