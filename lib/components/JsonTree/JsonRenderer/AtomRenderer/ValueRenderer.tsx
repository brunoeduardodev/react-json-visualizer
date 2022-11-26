import React from "react";
import { ValidJSON } from "../../../../types";
import { BooleanRenderer } from "./BooleanRenderer";
import { NullRenderer } from "./NullRenderer";
import { NumberRenderer } from "./NumberRenderer";
import { ObjectRenderer } from "./ObjectRenderer";
import { StringRenderer } from "./StingRenderer";

type Props = {
  data: ValidJSON;
  depth: number;
  lineOffset: number;
};

export const ValueRenderer = ({ data, depth, lineOffset }: Props) => {
  if (typeof data === "string") {
    return <StringRenderer data={data} />;
  }

  if (typeof data === "number") {
    return <NumberRenderer data={data} />;
  }

  if (typeof data === "boolean") {
    return <BooleanRenderer data={data} />;
  }

  if (data === null) {
    return <NullRenderer data={data} />;
  }

  if (Array.isArray(data)) {
    return null;
  }

  return <ObjectRenderer data={data} depth={depth} lineOffset={lineOffset} />;
};
