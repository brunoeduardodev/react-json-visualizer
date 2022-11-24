import React from "react";
import { Cell } from "./styles";

type Props = {
  data: null;
};

export const NullRenderer = ({ data }: Props) => {
  return <Cell type="null">null</Cell>;
};
