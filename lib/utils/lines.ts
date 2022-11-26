import { ValidJSON } from "../types";

const getLinesDifference = (object: ValidJSON) => {
  if (["string", "number", "boolean", "undefined"].includes(typeof object))
    return 1;

  if (object === null) return 1;

  return Object.entries(object).reduce((totalLines, [key, value]) => {
    return totalLines + getLinesDifference(value);
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