import { writable } from "svelte/store";

let nextId = 0;

const todos = writable([]);

function add(text) {
  todos.update(current => [...current, { id: ++nextId, text, done: false }]);
}

function reset(arr) {
  todos.set(arr);
  nextId = arr[arr.length - 1].id;
}

function check(id) {
  todos.update(current =>
    current.map(item => (item.id === id ? { ...item, done: true } : item))
  );
}

function uncheck(id) {
  todos.update(current =>
    current.map(item => (item.id === id ? { ...item, done: false } : item))
  );
}

export default {
  subscribe: todos.subscribe,
  add,
  reset,
  check,
  uncheck
};
