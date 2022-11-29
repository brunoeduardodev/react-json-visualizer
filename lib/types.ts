export type Primitive = string | number | boolean | null;

export type ValidJSON = string | number | boolean | object | null;
export const ValidJSONTypes = ["string", "number", "boolean", "object"];

export type StringSchema = {
  key: string | null;
  type: "string";
  value: string;
};

export type NumberSchema = {
  key: string | null;
  type: "number";
  value: number;
};

export type BooleanSchema = {
  key: string | null;
  type: "boolean";
  value: boolean;
};

export type NullSchema = {
  key: string | null;
  type: "null";
  value: null;
};

export type ArraySchema = {
  key: string | null;
  type: "array";
  entries: ValueSchema[];
};

type ObjectEntry = {
  key: string | null;
  type: "object";
  entries: ValueSchema[];
};

export type ValueSchema = StringSchema | NumberSchema | BooleanSchema | NullSchema | ArraySchema | ObjectEntry;
