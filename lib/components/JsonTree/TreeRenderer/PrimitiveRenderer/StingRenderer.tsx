import React from "react";
import { Cell } from "./styles";

type Props = {
  data: string;
};

export const StringRenderer = ({ data }: Props) => {
  return <Cell type="string">"{data}"</Cell>;
};
