import { readFixture } from "../test-utils/read-fixture";
import { firstPart, secondPart } from "./day-3";

let sampleInput: string;
let realInput: string;

beforeAll(async () => {
  sampleInput = await readFixture("./fixtures/day-three/first-part.txt");
  realInput = await readFixture("./inputs/day-three.txt");
});

describe("firstPart", () => {
  it("returns 198 for the sample input", () => {
    expect(firstPart(sampleInput)).toBe(198);
  });

  it("returns 4103154 for the real input", () => {
    expect(firstPart(realInput)).toBe(4103154);
  });
});

describe("secondPart", () => {
  it("returns 230 for the sample input", async () => {
    expect(secondPart(sampleInput)).toBe(230);
  });

  it("returns 4245351 for the real input", () => {
    expect(secondPart(realInput)).toBe(4245351);
  });
});
