export function orderAscendingByCreationDate(a, b) {
  if (a.createdOn === b.createdOn) return 0;
  return a.createdOn > b.createdOn ? 1 : -1;
}

export function orderDescendingByCompletionDate(a, b) {
if (a.completedOn === b.completedOn) return 0;
  return a.completedOn < b.completedOn ? 1 : -1;
}
