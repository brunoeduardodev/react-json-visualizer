export type Primitive = string | number | boolean | null;

export type ValidJSON = string | number | boolean | object | null;
export const ValidJSONTypes = ["string", "number", "boolean", "object"];

export type StringSchema = {
  type: "string";
  value: string;
};

export type NumberSchema = {
  type: "number";
  value: number;
};

export type BooleanSchema = {
  type: "boolean";
  value: boolean;
};

export type NullSchema = {
  type: "null";
  value: null;
};
