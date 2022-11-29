import { ValidJSON, ValueSchema } from "../types";

type Options = {
  key: string | null;
  value: ValidJSON;
};

export const generateSchema = ({ key, value }: Options): ValueSchema => {
  if (value === null) {
    return {
      type: "null",
      key,
      value,
    };
  }

  if (typeof value === "object") {
    return {
      type: Array.isArray(value) ? "array" : "object",
      key,
      entries: Object.entries(value).map(([key, value]) => {
        return generateSchema({
          key,
          value,
        });
      }),
    };
  }

  return {
    type: typeof value,
    key,
    value,
  } as ValueSchema; // TODO: Remove this type assertion
};

type MaybeArray<T> = T | T[];

export const getTotalLinesFromSchema = (value: MaybeArray<ValueSchema>): number => {
  if (Array.isArray(value)) {
    return value.reduce((total, entry) => {
      return getTotalLinesFromSchema(entry) + total;
    }, 1);
  }

  if ("entries" in value) {
    return 1 + getTotalLinesFromSchema(value.entries);
  }

  return 1;
};
