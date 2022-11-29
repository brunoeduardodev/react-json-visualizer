import React from "react";
import { Cell } from "./styles";

type Props = {
  data: string;
};

export const KeyRenderer = ({ data }: Props) => {
  return <Cell type="key">{`"${data}"`}</Cell>;
};
