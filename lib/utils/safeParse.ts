import { ValidJSON, ValidJSONTypes } from "../types";

type SuccessResult = {
  data: ValidJSON;
  error: null;
};

type ErrorResult = {
  data: null;
  error: true;
};

export const safeParse = (data: unknown): SuccessResult | ErrorResult => {
  if (ValidJSONTypes.filter((type) => type !== "string").includes(typeof data))
    return { data: data as ValidJSON, error: null };

  try {
    const parsed = JSON.parse(data as string);
    return { data: parsed, error: null };
  } catch (err) {
    return { error: true, data: null };
  }
};
