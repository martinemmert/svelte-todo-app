export function orderAscendingByCreationDate(a, b) {
  if (a.createdOn === b.createdOn) return 0;
  return a.createdOn > b.createdOn ? 1 : -1;
}

export function orderDescendingByPriority(a, b) {
  if (a.priority === b.priority) return 0;
  return a.priority < b.priority ? 1 : -1;
}

export function orderAscendingByDueDate(a, b) {
  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;
  if (a.dueDate === b.dueDate) return 0;
  return a.dueDate > b.dueDate ? 1 : -1;
}

export function orderDescendingByDueDate(a, b) {
  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;
  if (a.dueDate === b.dueDate) return 0;
  return a.dueDate < b.dueDate ? 1 : -1;
}

export function orderDescendingByCompletionDate(a, b) {
  if (a.completedOn === b.completedOn) return 0;
  return a.completedOn < b.completedOn ? 1 : -1;
}
