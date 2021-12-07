import { readFile } from "fs/promises";
import glob from "glob";
import { z } from "zod";
import { get, Solution } from "../src/solutions/utils/get-solution";
import { zip } from "lodash";
import { readFileSync } from "fs";

const stringNumber = z.string().transform((str) => Number.parseInt(str, 10));

const sampleInputSchema = z.object({
  day: stringNumber.refine((number) => number <= 25),
  fileNo: stringNumber,
});

type FileDetails = {
  path: string;
  fileNo: number;
  type: FileDetailsType;
  day: number;
};

type Day = {
  realInputs: FileDetails[];
  sampleInputs: FileDetails[];
  realOutputs: FileDetails[];
  sampleOutputs: FileDetails[];
};

type DataSource = "REAL" | "SAMPLE";
type IOType = "INPUT" | "OUTPUT";

type FileDetailsType = `${DataSource}_${IOType}`;

const getDataSource = (path: string): DataSource =>
  path.includes("real") ? "REAL" : "SAMPLE";
const getIOType = (path: string): IOType =>
  path.includes("input") ? "INPUT" : "OUTPUT";

const getType = (path: string): FileDetailsType =>
  `${getDataSource(path)}_${getIOType(path)}`;

const dayInformation = glob
  .sync("./test/@(real|sample)-@(inputs|outputs)/*.txt")
  .map((path) => {
    const structuredInput = path.match(/day-(?<day>\d+)-(?<fileNo>\d+).txt/);
    if (structuredInput === null) {
      throw new Error("invalid.file.format");
    }
    const { day, fileNo } = sampleInputSchema.parse(structuredInput.groups);

    return { day, fileNo, path, type: getType(path) };
  })
  .reduce((acc, currentFile) => {
    const day = acc.get(currentFile.day) || {
      sampleInputs: [],
      realInputs: [],
      sampleOutputs: [],
      realOutputs: [],
    };

    switch (currentFile.type) {
      case "SAMPLE_INPUT":
        day.sampleInputs.push(currentFile);
        break;
      case "REAL_INPUT":
        day.realInputs.push(currentFile);
        break;
      case "REAL_OUTPUT":
        day.realOutputs.push(currentFile);
        break;
      case "SAMPLE_OUTPUT":
        day.sampleOutputs.push(currentFile);
        break;
    }

    acc.set(currentFile.day, day);

    return acc;
  }, new Map<number, Day>());

const expectedOutputFormat = z.object({
  firstPart: stringNumber.optional(),
  secondPart: stringNumber.optional(),
});

describe.each([...dayInformation.entries()])(
  "Day %s",
  (day: number, fileDetails: Day) => {
    let solution: Solution;

    beforeAll(async () => {
      solution = await get(day);
    });

    describe.each(
      zip(fileDetails.sampleInputs, fileDetails.sampleOutputs).map(
        ([inputFile, expectedOutputFile]) => ({ expectedOutputFile, inputFile })
      )
    )("sample $inputFile.fileNo", ({ inputFile, expectedOutputFile }) => {
      if (!inputFile || !expectedOutputFile) {
        throw new Error("missing input or output");
      }

      const input = readFileSync(inputFile.path).toString("utf-8");
      const expectedOutputContents = readFileSync(
        expectedOutputFile.path
      ).toString();

      const expectedOutput = expectedOutputFormat.parse(
        expectedOutputContents.match(
          /01.sample = (?<firstPart>\d+)[\s\S]+02.sample = (?<secondPart>\d+)/
        )?.groups
      );

      it(`firstPart: returns ${expectedOutput.firstPart}`, () => {
        expect(solution.firstPart(input)).toEqual(expectedOutput.firstPart);
      });

      it(`secondPart: returns ${expectedOutput.secondPart}`, () => {
        expect(solution.secondPart(input)).toEqual(expectedOutput.secondPart);
      });
    });

    describe.each(
      zip(fileDetails.realInputs, fileDetails.realOutputs).map(
        ([inputFile, expectedOutputFile]) => ({ expectedOutputFile, inputFile })
      )
    )("real $inputFile.fileNo", ({ inputFile, expectedOutputFile }) => {
      if (!inputFile || !expectedOutputFile) {
        throw new Error("missing input or output");
      }

      const input = readFileSync(inputFile.path).toString("utf-8");
      const expectedOutputContents = readFileSync(
        expectedOutputFile.path
      ).toString();

      const expectedOutput = expectedOutputFormat.parse(
        expectedOutputContents.match(
          /01.real = (?<firstPart>\d+)[\s\S]+02.real = (?<secondPart>\d+)/
        )?.groups
      );

      it(`firstPart: returns ${expectedOutput.firstPart}`, () => {
        expect(solution.firstPart(input)).toEqual(expectedOutput.firstPart);
      });

      it(`secondPart: returns ${expectedOutput.secondPart}`, () => {
        expect(solution.secondPart(input)).toEqual(expectedOutput.secondPart);
      });
    });
  }
);
