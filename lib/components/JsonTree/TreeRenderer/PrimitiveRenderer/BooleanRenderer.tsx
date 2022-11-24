import React from "react";
import { Cell } from "./styles";

type Props = {
  data: boolean;
};

export const BooleanRenderer = ({ data }: Props) => {
  return <Cell type="boolean">{data ? "true" : "false"}</Cell>;
};
