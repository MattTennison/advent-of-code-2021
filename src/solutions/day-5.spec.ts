import { readFixture } from "../test-utils/read-fixture";
import { firstPart, secondPart } from "./day-5";

let sampleInput: string;
let realInput: string;

beforeAll(async () => {
  sampleInput = await readFixture("./fixtures/day-five/first-part.txt");
  realInput = await readFixture("./inputs/day-five.txt");
});

describe("firstPart", () => {
  it("returns 5 for the sample input", () => {
    expect(firstPart(sampleInput)).toBe(5);
  });

  it("returns 5373 for the real input", () => {
    expect(firstPart(realInput)).toBe(5373);
  });
});

describe("secondPart", () => {
  it("returns 12 for the sample input", async () => {
    expect(secondPart(sampleInput)).toBe(12);
  });

  it("returns 21514 for the real input", () => {
    expect(secondPart(realInput)).toBe(21514);
  });
});
