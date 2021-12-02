import { readFile } from "fs/promises";

export const readFixture = async (path: string) => {
  const fileBuffer = await readFile(path);

  return fileBuffer.toString("utf-8");
};
