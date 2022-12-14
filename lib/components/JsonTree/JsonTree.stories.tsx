import React from "react";
import { JsonTree } from ".";

export default {
  name: "JsonTree",
  component: JsonTree,
};

export const Failing = () => <JsonTree src="invalid json" />;

export const Passing = () => <JsonTree src='{"foo": "bar", "john": 2}' />;

export const Nested = () => <JsonTree src='{"foo": "bar", "john": 2, "nested": {"open": true}}' />;

export const DeepNested = () => (
  <JsonTree
    src={JSON.stringify({
      foo: "bar",
      deep: {
        yes: true,
        realNested: {
          willContinue: true,
          theLast: {
            end: true,
          },
        },
      },
    })}
  />
);

export const PlainString = () => <JsonTree src={'"Hello World"'} />;
export const PlainNumber = () => <JsonTree src={"30"} />;
export const PlainBoolean = () => <JsonTree src={"true"} />;
export const PlainNull = () => <JsonTree src={"null"} />;
