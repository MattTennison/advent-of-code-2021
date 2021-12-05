const parseInput = (input: string) => {
  const [drawOrder, _, ...boardsRawInput] = input.split("\n");

  const startingBoard: string[][] = [[]];
  const boards = boardsRawInput.reduce((acc, currentLine) => {
    const isEmptyLine = currentLine.trim().length === 0;

    if (isEmptyLine) {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(currentLine);
    }

    return acc;
  }, startingBoard);

  return {
    drawOrder,
    boards: boards.map((board) => createBoard(board)),
  };
};

type Board = {
  markDraw: (n: number) => void;
  get hasWon(): boolean;
  get sumOfUncalledNumbers(): number;
};

const createBoard = (rows: string[]): Board => {
  const board = rows.map((row) =>
    row
      .split(" ")
      .filter(Boolean)
      .map((number) => ({
        value: Number.parseInt(number, 10),
        hasBeenCalled: false,
      }))
  );

  return {
    get sumOfUncalledNumbers() {
      return board
        .flat()
        .filter((cell) => !cell.hasBeenCalled)
        .reduce((acc, cell) => acc + cell.value, 0);
    },
    get hasWon() {
      const hasCompleteRow = board.some((row) =>
        row.every((cell) => cell.hasBeenCalled)
      );

      const hasCompleteColumn = board[0].reduce(
        (hasCompleteColumn, _, currentColumnIndex) => {
          return (
            hasCompleteColumn ||
            board
              .map((row) => row[currentColumnIndex].hasBeenCalled)
              .every(Boolean)
          );
        },
        false
      );

      return hasCompleteRow || hasCompleteColumn;
    },
    markDraw: (number: number) => {
      const cell = board.flat().find((cell) => cell.value === number);
      if (cell) {
        cell.hasBeenCalled = true;
      }
    },
  };
};

type Win = {
  board: Board;
  winningDraw: number;
};

const play = (drawOrder: string, boards: Board[]) => {
  const draws = drawOrder.split(",").map((draw) => Number.parseInt(draw, 10));

  const wins: Win[] = [];
  draws.forEach((draw) => {
    const inPlayBoards = boards.filter((b) => !b.hasWon);
    inPlayBoards.forEach((board) => {
      board.markDraw(draw);
    });

    wins.push(
      ...inPlayBoards
        .filter((b) => b.hasWon)
        .map((board) => ({ board, winningDraw: draw }))
    );
  });

  return wins;
};

export const firstPart = (input: string) => {
  const { drawOrder, boards } = parseInput(input);

  const [winningBoard] = play(drawOrder, boards);
  const {
    board: { sumOfUncalledNumbers },
    winningDraw,
  } = winningBoard;

  return sumOfUncalledNumbers * winningDraw;
};

export const secondPart = (input: string) => {
  const { drawOrder, boards } = parseInput(input);

  const wins = play(drawOrder, boards);
  const losingBoard = wins[wins.length - 1];
  const {
    board: { sumOfUncalledNumbers },
    winningDraw,
  } = losingBoard;

  return sumOfUncalledNumbers * winningDraw;
};
