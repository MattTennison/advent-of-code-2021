import { readFixture } from "../test-utils/read-fixture";
import { firstPart, secondPart } from "./day-2";

let sampleInput: string;
let realInput: string;

beforeAll(async () => {
  sampleInput = await readFixture("./fixtures/day-two/first-part.txt");
  realInput = await readFixture("./inputs/day-two.txt");
});

describe("firstPart", () => {
  it("returns 150 for the sample input", () => {
    expect(firstPart(sampleInput)).toBe(150);
  });

  it("returns 2215080 for the real input", () => {
    expect(firstPart(realInput)).toBe(2215080);
  });
});

describe("secondPart", () => {
  it("returns 900 for the sample input", async () => {
    expect(secondPart(sampleInput)).toBe(900);
  });

  it("returns 1864715580 for the real input", () => {
    expect(secondPart(realInput)).toBe(1864715580);
  });
});
