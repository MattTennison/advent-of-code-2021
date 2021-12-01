import { firstPart } from '../../solutions/day-1';

type Solution = {
  firstPart: (input: string) => string;
}

const solutionMap = new Map<number, Solution>();
solutionMap.set(1, { firstPart });

export const get = (day: number) => solutionMap.get(day);