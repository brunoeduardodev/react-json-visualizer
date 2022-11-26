import React from "react";
import { LineRenderer } from "./LineRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  // return <ObjectRenderer lineOffset={0} depth={0} data={data} />;
  return <LineRenderer isLast depth={0} line={0} value={data} />;
};
