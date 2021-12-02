const algorithm = (input: number[]) => {
  let previousValue = Number.MAX_SAFE_INTEGER;
  let measurementsLargerThanPrevious = 0;

  for (let value of input) {
    if (value > previousValue) {
      measurementsLargerThanPrevious++;
    }
    previousValue = value;
  }

  return measurementsLargerThanPrevious;
};

const rollingWindow = (n: number, index: number, arr: number[]) => {
  return n + arr[index + 1] + arr[index + 2];
};

const parseInput = (input: string) =>
  input.split("\n").map((numberString) => Number.parseInt(numberString));

export const firstPart = (input: string) => {
  return algorithm(parseInput(input));
};

export const secondPart = (input: string) => {
  return algorithm(parseInput(input).map(rollingWindow));
};
