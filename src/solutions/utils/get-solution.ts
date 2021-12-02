import * as dayOne from "../../solutions/day-1";

type Solution = {
  firstPart: (input: string) => string | number;
  secondPart: (input: string) => string | number;
};

const solutionMap = new Map<number, Solution>();
solutionMap.set(1, dayOne);

export const get = (day: number) => solutionMap.get(day);
