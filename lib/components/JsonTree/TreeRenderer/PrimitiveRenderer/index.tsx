import React from "react";
import { Primitive } from "../../../../types";
import { NumberRenderer } from "./NumberRenderer";
import { StringRenderer } from "./StingRenderer";

type Props = {
  data: Primitive;
};

export const PrimitiveRenderer = ({ data }: Props) => {
  if (typeof data === "string") {
    return <StringRenderer data={data} />;
  }

  if (typeof data === "number") {
    return <NumberRenderer data={data} />;
  }

  return null;
};
