import { readFile } from "fs/promises";
import glob from "glob";
import { get, Solution } from "../src/solutions/utils/get-solution";
import { slowSolutions } from "./slow-solutions";

const daysAttempted = glob
  .sync("./test/@(real|sample)-@(inputs|outputs)/*.txt")
  .reduce((acc, fileName) => {
    const structuredInput = fileName.match(/day-(?<day>\d+).+.txt/);
    if (structuredInput?.groups?.day) {
      acc.add(Number.parseInt(structuredInput.groups.day, 10));
    }
    return acc;
  }, new Set<number>());

const readFileAsString = (fileName: string) =>
  readFile(fileName).then((buf) => buf.toString("utf-8"));

const daysToTest = [...daysAttempted].filter(
  (day) => process.env.SLOW || !slowSolutions.includes(day)
);

describe.each(daysToTest)("Day %i", (day: number) => {
  const dayInTwoDigits = day.toString().padStart(2, "0");

  let solution: Solution;

  beforeAll(async () => {
    solution = await get(day);
  });

  describe("Part 1", () => {
    it("is correct for the sample input & output", async () => {
      const sampleInput = await readFileAsString(
        `./test/sample-inputs/day-${dayInTwoDigits}-01.txt`
      );

      const sampleOutput = await readFileAsString(
        `./test/sample-outputs/day-${dayInTwoDigits}-01.txt`
      );

      expect(solution.firstPart(sampleInput).toString()).toBe(sampleOutput);
    });

    it("is correct for the real input & output", async () => {
      const realInput = await readFileAsString(
        `./test/real-inputs/day-${dayInTwoDigits}-01.txt`
      );

      const realOutput = await readFileAsString(
        `./test/real-outputs/day-${dayInTwoDigits}-01.txt`
      );

      expect(solution.firstPart(realInput).toString()).toBe(realOutput);
    });
  });

  describe("Part 2", () => {
    it("is correct for the sample input & output", async () => {
      const sampleInput = await readFileAsString(
        `./test/sample-inputs/day-${dayInTwoDigits}-01.txt`
      );

      const sampleOutput = await readFileAsString(
        `./test/sample-outputs/day-${dayInTwoDigits}-02.txt`
      );

      expect(solution.secondPart(sampleInput).toString()).toBe(sampleOutput);
    });

    it("is correct for the real input & output", async () => {
      const realInput = await readFileAsString(
        `./test/real-inputs/day-${dayInTwoDigits}-01.txt`
      );

      const realOutput = await readFileAsString(
        `./test/real-outputs/day-${dayInTwoDigits}-02.txt`
      );

      expect(solution.secondPart(realInput).toString()).toBe(realOutput);
    });
  });
});
