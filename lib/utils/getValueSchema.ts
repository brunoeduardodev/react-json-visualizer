import { ValidJSON, ValueSchema } from "../types";

type Options = {
  key: string | null;
  value: ValidJSON;
};

export const getValueSchema = ({ key, value }: Options): ValueSchema => {
  if (typeof value === "string") {
    return {
      type: "string",
      key,
      value,
    };
  }

  if (typeof value === "number") {
    return {
      type: "number",
      key,
      value,
    };
  }

  if (typeof value === "boolean") {
    return {
      type: "boolean",
      key,
      value,
    };
  }

  if (value === null) {
    return {
      type: "null",
      key,
      value,
    };
  }

  if (Array.isArray(value)) {
    return {
      type: "array",
      key,
      entries: Object.entries(value).map(([key, value]) => {
        return getValueSchema({ key, value });
      }),
    };
  }

  return {
    type: "object",
    key,
    entries: Object.entries(value).map(([key, value], index) => {
      return getValueSchema({
        key,
        value,
      });
    }),
  };
};

type MaybeArray<T> = T | T[];

export const getTotalLinesFromSchema = (
  value: MaybeArray<ValueSchema>
): number => {
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
