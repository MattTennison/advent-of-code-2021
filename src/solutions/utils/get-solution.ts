import { z } from "zod";

const solutionFn = z
  .function()
  .args(z.string())
  .returns(z.string().or(z.number()));

const expectedExports = z.object({
  firstPart: solutionFn,
  secondPart: solutionFn,
});

export type Solution = z.infer<typeof expectedExports>;

export const get = (day: number) =>
  import(`../day-${day}.ts`).then((mod) => expectedExports.parse(mod));
