import { ValidJSON } from "../types";

export const getLinesDifference = (object: ValidJSON): number => {
  if (["string", "number", "boolean", "undefined"].includes(typeof object)) return 1;

  if (object === null) return 1;

  return Object.entries(object).reduce((totalLines, [key, value]) => {
    return totalLines + getLinesDifference(value) + 1;
  }, 0);
};

export const getEntriesWithLines = (object: object, currentLine: number) => {
  let lineAccumulator = 0;

  const entries = Object.entries(object).map(([key, value]) => {
    const fromLine = currentLine + lineAccumulator;
    lineAccumulator += getLinesDifference(value);

    return {
      key,
      value,
      fromLine,
      toLine: currentLine + lineAccumulator,
    };
  });

  return entries;
};
