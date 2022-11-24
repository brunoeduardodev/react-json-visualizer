import React from "react";
import { JsonTree } from ".";

export default {
  name: "JsonTree",
  component: JsonTree,
};

export const Failing = () => <JsonTree src="invalid json" />;

export const Passing = () => <JsonTree src='{"foo": "bar"}' />;

export const PrimitiveValue = () => <JsonTree src={'"Hello World"'} />;
