import { z } from "zod";

export const binaryStringValueSchema = z.literal("0").or(z.literal("1"));
type BinaryString = z.infer<typeof binaryStringValueSchema>;

const binaryValue = (binaryString: string) => {
  return {
    value: binaryString,
    charAt: (index: number) =>
      binaryStringValueSchema.parse(binaryString.charAt(index)),
  };
};

const parseInput = (input: string) => {
  return input.split("\n").map((line) => binaryValue(line));
};

const arrayOfLength = (length: number) => {
  return new Array(length).fill(true).map((_, index) => index);
};

const sortByPopularity = (
  input: BinaryString[],
  tieBreak: BinaryString
): BinaryString[] => {
  const numberOfZeroes = input.filter((val) => val === "0").length;
  const numberOfOnes = input.length - numberOfZeroes;

  if (numberOfOnes === numberOfZeroes) {
    return sortByPopularity([...input, tieBreak], tieBreak);
  }

  return numberOfOnes > numberOfZeroes ? ["1", "0"] : ["0", "1"];
};

export const firstPart = (input: string) => {
  const lines = parseInput(input);

  const targetLength = lines[0].value.length;
  const { gammaRate, epsilonRate } = arrayOfLength(targetLength).reduce(
    (acc, currentIndex) => {
      const [mostPopular, leastPopular] = sortByPopularity(
        lines.map((line) => line.charAt(currentIndex)),
        "1"
      );

      acc.gammaRate = acc.gammaRate + mostPopular;
      acc.epsilonRate = acc.epsilonRate + leastPopular;

      return acc;
    },
    {
      gammaRate: "",
      epsilonRate: "",
    }
  );

  return Number.parseInt(gammaRate, 2) * Number.parseInt(epsilonRate, 2);
};

export const secondPart = (input: string) => {
  const lines = parseInput(input);
  const targetLength = lines[0].value.length;

  const [oxygenGeneratorRating] = arrayOfLength(targetLength).reduce(
    (currentPotentialLines, currentIndex) => {
      if (currentPotentialLines.length === 1) {
        return currentPotentialLines;
      }

      const [mostPopular, leastPopular] = sortByPopularity(
        currentPotentialLines.map((line) => line.charAt(currentIndex)),
        "1"
      );

      return currentPotentialLines.filter(
        (line) => line.charAt(currentIndex) === mostPopular
      );
    },
    [...lines]
  );

  const [CO2ScrubberRating] = arrayOfLength(targetLength).reduce(
    (currentPotentialLines, currentIndex) => {
      if (currentPotentialLines.length === 1) {
        return currentPotentialLines;
      }

      const [mostPopular, leastPopular] = sortByPopularity(
        currentPotentialLines.map((line) => line.charAt(currentIndex)),
        "1"
      );

      return currentPotentialLines.filter(
        (line) => line.charAt(currentIndex) === leastPopular
      );
    },
    [...lines]
  );

  return (
    Number.parseInt(oxygenGeneratorRating.value, 2) *
    Number.parseInt(CO2ScrubberRating.value, 2)
  );
};
