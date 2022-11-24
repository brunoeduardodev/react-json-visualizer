import React from "react";
import { Primitive } from "../../../../types";
import { StringRenderer } from "./StingRenderer";

type Props = {
  data: Primitive;
};

export const PrimitiveRenderer = ({ data }: Props) => {
  if (typeof data === "string") {
    return <StringRenderer data={data} />;
  }

  return null;
};
