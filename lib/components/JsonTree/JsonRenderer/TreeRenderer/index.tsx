import React from "react";
import { ObjectRenderer } from "./ObjectRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  return <ObjectRenderer data={data} />;
};
