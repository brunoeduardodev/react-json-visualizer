import React, { useMemo } from "react";
import { getEntriesWithLines } from "../../../../utils";
import { Enclosure } from "../Enclosure";
import { Line } from "../Line";
import { KeyRenderer } from "./KeyRenderer";
import { ValueRenderer } from "./ValueRenderer";

type Props = {
  data: object;
  depth: number;
  lineOffset: number;
};

export const ObjectRenderer = ({ data, lineOffset, depth }: Props) => {
  const isRoot = lineOffset === 0;
  const entries = getEntriesWithLines(data, isRoot ? 2 : lineOffset);

  return (
    <Enclosure isRoot={isRoot} toLine={entries.at(-1)?.toLine} type="curly">
      {entries.map(({ fromLine, key, value }) => (
        <Line key={`${depth} - ${key}`} depth={depth + 1} line={fromLine}>
          <KeyRenderer data={key} />: <ValueRenderer data={value} />
        </Line>
      ))}
    </Enclosure>
  );
};
