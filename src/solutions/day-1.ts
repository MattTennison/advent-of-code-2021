const algorithm = (input: number[]) => {
  const result = input
  .reduce((acc, currentLine) => {
    if (currentLine > acc.previousMeasurement) {
      acc.measurementsLargerThanPrevious++;
    }

    return {
      ...acc,
      previousMeasurement: currentLine
    };
    }, { measurementsLargerThanPrevious: 0, previousMeasurement: Number.MAX_SAFE_INTEGER });

  return result.measurementsLargerThanPrevious;
}

const rollingWindow = (windowSize: number) => (n: number, index: number, arr: number[]) => {
  return n + arr[index + 1] + arr[index + 2];
}

export const firstPart = (input: string) => {
  const parsedInput = input
    .split('\n')
    .map(numberString => Number.parseInt(numberString));

  return algorithm(parsedInput);
}

export const secondPart = (input: string) => {
  const parsedInput = input
    .split('\n')
    .map(numberString => Number.parseInt(numberString));
  
  return algorithm(parsedInput.map(rollingWindow(3)));
}