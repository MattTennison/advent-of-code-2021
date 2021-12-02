import { readFile } from "fs/promises";
import { get } from "../solutions/utils/get-solution";

export const solve = async (dayInput: string, inputPath: string) => {
  const day = Number.parseInt(dayInput);
  const inputBuffer = await readFile(inputPath);
  const input = await inputBuffer.toString();

  const solution = get(day);
  if (solution === undefined) {
    return;
  }

  console.group("Results");
  console.log(`First Part: ${solution.firstPart(input)}`);
  console.log(`Second Part: ${solution.secondPart(input)}`);
  console.groupEnd();
};
