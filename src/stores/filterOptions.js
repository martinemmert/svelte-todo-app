import { writable, derived } from "svelte/store";

const DEFAULT_OPTIONS = {
  displayCompletedItems: false,
  sortOrder: "creationDate",
};

const data = localStorage.getItem("filterOptions");
const initialData = data ? { ...DEFAULT_OPTIONS, ...JSON.parse(data) } : { ...DEFAULT_OPTIONS };

export const displayCompletedItems = writable(initialData.displayCompletedItems);
export const sortOrder = writable(initialData.sortOrder);

const filterOptions = derived(
  [displayCompletedItems, sortOrder],
  ([$displayCompletedItems, $sortOrder]) => ({
    displayCompletedItems: $displayCompletedItems,
    sortOrder: $sortOrder,
  }),
);

filterOptions.subscribe(val => {
  if (Object.keys(val).length < 1) {
    localStorage.removeItem("filterOptions");
  } else {
    localStorage.setItem("filterOptions", JSON.stringify(val));
  }
});
