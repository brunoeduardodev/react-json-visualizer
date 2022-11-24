import React from "react";
import { Cell } from "./styles";

type Props = {
  data: number;
};

export const NumberRenderer = ({ data }: Props) => {
  return <Cell type="number">{data}</Cell>;
};
