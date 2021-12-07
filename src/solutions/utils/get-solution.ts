import * as dayOne from "../../solutions/day-1";
import * as dayTwo from "../../solutions/day-2";
import * as dayThree from "../../solutions/day-3";
import * as dayFour from "../../solutions/day-4";
import * as dayFive from "../../solutions/day-5";
import * as daySix from "../day-6";

type Solution = {
  firstPart: (input: string) => string | number;
  secondPart: (input: string) => string | number;
};

const solutionMap = new Map<number, Solution>();
solutionMap.set(1, dayOne);
solutionMap.set(2, dayTwo);
solutionMap.set(3, dayThree);
solutionMap.set(4, dayFour);
solutionMap.set(5, dayFive);
solutionMap.set(6, daySix);

export const get = (day: number) => solutionMap.get(day);
