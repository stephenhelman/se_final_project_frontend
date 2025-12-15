export const countOccurrences = (arr) => {
  // Use a Map to store key-value pairs (item: count)
  const counts = new Map();

  for (const item of arr) {
    // Get the current count or 0 if it doesn't exist, then increment it
    counts.set(item.name, (counts.get(item.name) || 0) + 1);
  }

  // You can return the Map directly or convert it to a plain object
  return Object.fromEntries(counts);
};
