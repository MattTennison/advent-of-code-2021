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

const rollingWindow = (n: number, index: number, arr: number[]) => {
  return n + arr[index + 1] + arr[index + 2];
}

const parseInput = (input: string) => input
  .split('\n')
  .map(numberString => Number.parseInt(numberString));

export const firstPart = (input: string) => {
  return algorithm(parseInput(input));
}

export const secondPart = (input: string) => {  
  return algorithm(parseInput(input).map(rollingWindow));
}