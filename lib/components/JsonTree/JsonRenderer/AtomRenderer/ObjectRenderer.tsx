import React, { useMemo } from "react";
import { Primitive, ValidJSON } from "../../../../types";
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

type EntryProps = {
  entryKey: string;
  value: Primitive;

  depth: number;
  line: number;
  isLast: boolean;
};

const EntryRenderer = ({
  entryKey,
  value,
  depth,
  isLast,
  line,
}: EntryProps) => {
  return (
    <Line depth={depth} line={line}>
      <KeyRenderer data={entryKey} />: <ValueRenderer data={value} />
      {isLast ? "" : ","}
    </Line>
  );
};

export const ObjectRenderer = ({ data, lineOffset, depth }: Props) => {
  const isRoot = lineOffset === 0;
  const entries = getEntriesWithLines(data, isRoot ? 2 : lineOffset);

  return (
    <Enclosure isRoot={isRoot} toLine={entries.at(-1)?.toLine} type="curly">
      {entries.map(({ fromLine, key, value }, index) => (
        <EntryRenderer
          key={`${depth}-${key}`}
          entryKey={key}
          depth={depth + 1}
          isLast={index === entries.length - 1}
          line={fromLine}
          value={value}
        />
      ))}
    </Enclosure>
  );
};
