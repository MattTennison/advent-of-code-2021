type TimerToNumberOfLanternfish = Map<number, number>;

const parseInput = (input: string) =>
  input
    .split(",")
    .map((value) => Number.parseInt(value, 10))
    .reduce((acc, internalTimerValue) => {
      const numberOfLanternfish = acc.get(internalTimerValue) || 0;
      acc.set(internalTimerValue, numberOfLanternfish + 1);
      return acc;
    }, new Map<number, number>());

function* simulateGrowth(startingInput: TimerToNumberOfLanternfish) {
  let currentPopulation: TimerToNumberOfLanternfish = new Map(
    startingInput.entries()
  );

  while (true) {
    currentPopulation = [...currentPopulation.entries()].reduce(
      (currentPopulation, [internalTimer, numberOfLanternfish]) => {
        if (internalTimer === 0) {
          currentPopulation.set(8, numberOfLanternfish);
          currentPopulation.set(
            6,
            (currentPopulation.get(6) || 0) + numberOfLanternfish
          );
        } else {
          currentPopulation.set(
            internalTimer - 1,
            (currentPopulation.get(internalTimer - 1) || 0) +
              numberOfLanternfish
          );
        }
        return currentPopulation;
      },
      new Map<number, number>()
    );

    yield currentPopulation;
  }
}

const populationAfterDays = (
  startingInput: TimerToNumberOfLanternfish,
  days: number
) => {
  const simulation = simulateGrowth(startingInput);
  for (let i = 1; i < days; i++) {
    simulation.next();
  }

  const finalDay = simulation.next();

  if (!finalDay.value) {
    return 0;
  }

  return [...finalDay.value.values()].reduce(
    (acc, currentFishCount) => acc + currentFishCount,
    0
  );
};

export const firstPart = (input: string) => {
  const startingInput = parseInput(input);

  return populationAfterDays(startingInput, 80);
};

export const secondPart = (input: string) => {
  const startingInput = parseInput(input);

  return populationAfterDays(startingInput, 256);
};
