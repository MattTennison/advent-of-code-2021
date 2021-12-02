import { readFixture } from "../test-utils/read-fixture";
import { firstPart, secondPart } from "./day-1";

let sampleInput: string;
let realInput: string;

beforeAll(async () => {
  sampleInput = await readFixture("./fixtures/day-one/first-part-01.txt");
  realInput = await readFixture("./inputs/day-one.txt");
});

describe("firstPart", () => {
  it("returns 7 for the sample input", () => {
    expect(firstPart(sampleInput)).toBe(7);
  });

  it("returns 1233 for the real input", () => {
    expect(firstPart(realInput)).toBe(1233);
  });
});

describe("secondPart", () => {
  it("returns 5 for the sample input", async () => {
    expect(secondPart(sampleInput)).toBe(5);
  });

  it("returns 1275 for the real input", () => {
    expect(secondPart(realInput)).toBe(1275);
  });
});
