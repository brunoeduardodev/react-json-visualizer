import React from "react";
import { Primitive, ValidJSON } from "../../../../types";
import { BooleanRenderer } from "./BooleanRenderer";
import { NullRenderer } from "./NullRenderer";
import { NumberRenderer } from "./NumberRenderer";
import { ObjectRenderer } from "./ObjectRenderer";
import { StringRenderer } from "./StingRenderer";

type Props = {
  data: Primitive;
};

export const ValueRenderer = ({ data }: Props) => {
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

  return null;
};
