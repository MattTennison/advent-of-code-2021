import { number, z } from "zod";
import { range } from "../utils/range";

type Cell = {
  x: number;
  y: number;
};

type Line = {
  cells: Cell[];
};

type Grid = Map<Cell, Number>;

const numericString = z
  .string()
  .transform((numericString) => Number.parseInt(numericString, 10));

const lineDefinition = z.object({
  startX: numericString,
  startY: numericString,
  endX: numericString,
  endY: numericString,
});
type LineDefinition = z.infer<typeof lineDefinition>;

const parseInput = (input: string) => {
  const lines = input.split("\n");

  return lines.map((line) => {
    const parsingRegex =
      /(?<startX>\d+),(?<startY>\d+) -> (?<endX>\d+),(?<endY>\d+)/;
    return lineDefinition.parse(line.match(parsingRegex)?.groups);
  });
};

const toStraightLine = (definition: LineDefinition): Line => {
  const cells = range(definition.startX, definition.endX).flatMap((column) =>
    range(definition.startY, definition.endY).flatMap((row) => ({
      x: column,
      y: row,
    }))
  );

  return { cells };
};

const isStraightLine = (definition: LineDefinition) => {
  const { startX, endX, startY, endY } = definition;

  return startX === endX || startY === endY;
};

export const firstPart = (input: string) => {
  const grid = parseInput(input)
    .filter((line) => isStraightLine(line))
    .flatMap((line) => toStraightLine(line).cells)
    .map((cell) => `${cell.x},${cell.y}`)
    .reduce((grid, cell) => {
      grid.set(cell, (grid.get(cell) || 0) + 1);
      return grid;
    }, new Map<string, number>());

  const gridCells = [...grid.entries()];
  return gridCells.filter(([_, count]) => count > 1).length;
};

const order = (a: LineDefinition) => {
  const [{ x: startX, y: startY }, { x: endX, y: endY }] = [
    { x: a.startX, y: a.startY },
    { x: a.endX, y: a.endY },
  ].sort((a, b) => a.x - b.x);

  return { startX, startY, endX, endY };
};

const isDiagonalLine = (definition: LineDefinition) => {
  const { startX, endX, startY, endY } = definition;

  const xDiff = endX - startX;
  const yDiff = endY - startY;

  return Math.abs(xDiff) === Math.abs(yDiff);
};

const toDiagonalLine = (definition: LineDefinition) => {
  const cells = range(definition.startX, definition.endX).map((x, index) => {
    const y =
      definition.startY +
      (definition.startY > definition.endY ? -index : index);

    return {
      x,
      y,
    };
  });
  return {
    cells,
  };
};

export const secondPart = (input: string) => {
  const straightLineCells = parseInput(input)
    .filter((line) => isStraightLine(line))
    .flatMap((line) => toStraightLine(line).cells);

  const diagonalLineCells = parseInput(input)
    .map((line) => order(line))
    .filter((line) => isDiagonalLine(line))
    .flatMap((line) => toDiagonalLine(line).cells);

  const grid = [...straightLineCells, ...diagonalLineCells]
    .map((cell) => `${cell.x},${cell.y}`)
    .reduce((grid, cell) => {
      grid.set(cell, (grid.get(cell) || 0) + 1);
      return grid;
    }, new Map<string, number>());

  return [...grid.entries()].filter(([_, count]) => count > 1).length;
};
