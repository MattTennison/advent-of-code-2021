import * as dayOne from "../../solutions/day-1";
import * as dayTwo from "../../solutions/day-2";
import * as dayThree from "../../solutions/day-3";

type Solution = {
  firstPart: (input: string) => string | number;
  secondPart: (input: string) => string | number;
};

const solutionMap = new Map<number, Solution>();
solutionMap.set(1, dayOne);
solutionMap.set(2, dayTwo);
solutionMap.set(3, dayThree);

export const get = (day: number) => solutionMap.get(day);
