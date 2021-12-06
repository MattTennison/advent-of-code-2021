export const range = (start: number, end: number): number[] => {
  if (start > end) {
    return range(end, start);
  }

  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
