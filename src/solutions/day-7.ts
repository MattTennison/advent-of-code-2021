const parseInput = (input: string) =>
  input.split(",").map((n) => Number.parseInt(n, 10));

const fuelFor = (crabs: number[], destination: number) =>
  crabs.reduce((fuelUsed, crab) => fuelUsed + Math.abs(crab - destination), 0);

const minimumFuelForAlignment = (crabs: number[]) => {
  const sortedCrabs = [...crabs].sort((a, b) => a - b);

  const target = sortedCrabs[Math.ceil((sortedCrabs.length - 1) / 2)];

  return fuelFor(crabs, target);
};

export const firstPart = (input: string) => {
  const crabs = parseInput(input);

  return minimumFuelForAlignment(crabs);
};

// not sure if this is the right name but came from https://math.stackexchange.com/a/593323
const triangleNumber = (n: number): number => {
  if (n === 1 || n === 0) {
    return n;
  }
  return triangleNumber(n - 1) + n;
};

const exponenialFuelFor = (crabs: number[], destination: number) =>
  crabs.reduce(
    (fuelUsed, crab) => fuelUsed + triangleNumber(Math.abs(crab - destination)),
    0
  );

type Crab = {
  position: number;
  calculateFuelCost: (destination: number) => number;
};

export const secondPart = (input: string) => {
  const crabs: Crab[] = parseInput(input).map((startingPosition) => ({
    calculateFuelCost: (destination: number) =>
      triangleNumber(Math.abs(startingPosition - destination)),
    position: startingPosition,
  }));

  const range = [
    Math.min(...crabs.map((c) => c.position)),
    Math.max(...crabs.map((c) => c.position)),
  ];

  let result = { position: 0, cost: Number.MAX_SAFE_INTEGER };
  for (let position = range[0]; position < range[1]; position++) {
    const cost = crabs.reduce(
      (acc, crab) => acc + crab.calculateFuelCost(position),
      0
    );
    if (cost < result.cost) {
      result = { position, cost };
    }
  }

  return result.cost;
};
