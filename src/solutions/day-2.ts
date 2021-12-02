type FirstPartResult = {
  depth: number;
  horizontal: number;
};

const toFirstPartInstruction = ([direction, numberString]: string[]) => {
  const number = Number.parseInt(numberString);
  switch (direction) {
    case "forward":
      return ({ depth, horizontal }: FirstPartResult) => ({
        depth,
        horizontal: horizontal + number,
      });
    case "down":
      return ({ depth, horizontal }: FirstPartResult) => ({
        depth: depth + number,
        horizontal: horizontal,
      });
    case "up":
      return ({ depth, horizontal }: FirstPartResult) => ({
        depth: depth - number,
        horizontal: horizontal,
      });
    default:
      return ({ depth, horizontal }: FirstPartResult) => ({
        depth: depth,
        horizontal: horizontal,
      });
  }
};

type SecondPartResult = FirstPartResult & {
  aim: number;
};

const toSecondPartInstruction = ([direction, numberString]: string[]) => {
  const number = Number.parseInt(numberString);

  switch (direction) {
    case "forward":
      return ({ depth, horizontal, aim }: SecondPartResult) => ({
        depth: depth + number * aim,
        horizontal: horizontal + number,
        aim,
      });
    case "down":
      return ({ depth, horizontal, aim }: SecondPartResult) => ({
        depth,
        horizontal,
        aim: aim + number,
      });
    case "up":
      return ({ depth, horizontal, aim }: SecondPartResult) => ({
        depth,
        horizontal,
        aim: aim - number,
      });
    default:
      return ({ depth, horizontal, aim }: SecondPartResult) => ({
        depth,
        horizontal,
        aim,
      });
  }
};

const parseInput = (input: string) =>
  input.split("\n").map((line) => line.split(" "));

export const firstPart = (input: string) => {
  const startingPosition = { depth: 0, horizontal: 0 };
  const instructions = parseInput(input).map((statement) =>
    toFirstPartInstruction(statement)
  );

  const endPosition = instructions.reduce(
    (acc, currentInstruction) => currentInstruction(acc),
    startingPosition
  );

  return endPosition.depth * endPosition.horizontal;
};

export const secondPart = (input: string) => {
  const startingPosition = { depth: 0, horizontal: 0, aim: 0 };
  const instructions = parseInput(input).map((statement) =>
    toSecondPartInstruction(statement)
  );

  const endPosition = instructions.reduce(
    (acc, currentInstruction) => currentInstruction(acc),
    startingPosition
  );

  return endPosition.depth * endPosition.horizontal;
};
