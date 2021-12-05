import { readFixture } from "../test-utils/read-fixture";
import { firstPart, secondPart } from "./day-4";

let sampleInput: string;
let realInput: string;

beforeAll(async () => {
  sampleInput = await readFixture("./fixtures/day-four/first-part.txt");
  realInput = await readFixture("./inputs/day-four.txt");
});

describe("firstPart", () => {
  it("returns 4512 for the sample input", () => {
    expect(firstPart(sampleInput)).toBe(4512);
  });

  it("returns 64084 for the real input", () => {
    expect(firstPart(realInput)).toBe(64084);
  });
});

describe("secondPart", () => {
  it("returns 1924 for the sample input", async () => {
    expect(secondPart(sampleInput)).toBe(1924);
  });

  it("returns 12833 for the real input", () => {
    expect(secondPart(realInput)).toBe(12833);
  });
});
