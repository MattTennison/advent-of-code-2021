export type Solution = {
  firstPart: (input: string) => string | number;
  secondPart: (input: string) => string | number;
};

export const get = (day: number) => import(`../day-${day}.ts`);
