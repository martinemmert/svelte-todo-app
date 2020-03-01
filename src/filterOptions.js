import { writable } from "svelte/store";

const data = localStorage.getItem("filterOptions");
const initialData = data ? JSON.parse(data) : { displayCompletedItems: false };
const filterOptions = writable(initialData);

function toggleCompletedItems() {
  filterOptions.update(current => ({
    ...current,
    displayCompletedItems: !current.displayCompletedItems
  }));
}

filterOptions.subscribe(val => {
  if (Object.keys(val).length < 1) {
    localStorage.removeItem("filterOptions");
  } else {
    localStorage.setItem("filterOptions", JSON.stringify(val));
  }
});


export default {
  subscribe: filterOptions.subscribe,
  toggleCompletedItems
};
