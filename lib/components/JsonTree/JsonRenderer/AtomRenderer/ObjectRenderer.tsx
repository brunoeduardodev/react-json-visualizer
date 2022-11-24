import React from "react";
import { Enclosure } from "../Enclosure";
import { Line } from "../Line";
import { KeyRenderer } from "./KeyRenderer";
import { ValueRenderer } from "./ValueRenderer";

type Props = {
  data: object;
  depth: number;
};

export const ObjectRenderer = ({ data, depth }: Props) => {
  const entries = Object.entries(data);

  return (
    <Enclosure type="curly">
      {entries.map(([key, value]) => (
        <Line key={`${depth} - ${key}`} depth={depth + 1} line={1}>
          <KeyRenderer data={key} />: <ValueRenderer data={value} />
        </Line>
      ))}
    </Enclosure>
  );
};
