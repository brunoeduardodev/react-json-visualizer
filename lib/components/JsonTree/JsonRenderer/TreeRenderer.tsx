import React from "react";
import { ObjectRenderer } from "./AtomRenderer/ObjectRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  return <ObjectRenderer depth={0} data={data} />;
};
