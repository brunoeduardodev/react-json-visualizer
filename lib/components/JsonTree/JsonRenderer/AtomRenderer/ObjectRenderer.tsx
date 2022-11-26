import React, { useMemo } from "react";
import { Primitive, ValidJSON } from "../../../../types";
import { getEntriesWithLines } from "../../../../utils";
import { Line } from "../Line";
import { KeyRenderer } from "./KeyRenderer";
import { ValueRenderer } from "./ValueRenderer";
import { RootEnclosure, WithEnclosure } from "../Enclosure";

type Props = {
  data: object;
  depth: number;
  lineOffset: number;
};

type EntryProps = {
  entryKey: string;
  value: ValidJSON;

  depth: number;
  line: number;
  toLine: number;
  isLast: boolean;
};

const EntryRenderer = ({
  entryKey,
  value,
  depth,
  isLast,
  line,
  toLine,
}: EntryProps) => {
  if (typeof value === "object" && value !== null) {
    return (
      <WithEnclosure
        depth={depth}
        line={line}
        toLine={toLine}
        type="curly"
        enclosed={
          <ObjectRenderer depth={depth + 1} data={value} lineOffset={line} />
        }
      >
        <KeyRenderer data={entryKey} />:{" "}
      </WithEnclosure>
    );
  }

  return (
    <Line depth={depth} line={line}>
      <KeyRenderer data={entryKey} />:{" "}
      <ValueRenderer depth={depth} lineOffset={line} data={value} />
      {isLast ? "" : ","}
    </Line>
  );
};

export const ObjectRenderer = ({ data, lineOffset, depth }: Props) => {
  const isRoot = lineOffset === 0;
  const entries = getEntriesWithLines(data, isRoot ? 2 : lineOffset);

  if (isRoot) {
    return (
      <RootEnclosure type="curly" toLine={entries.at(-1)?.toLine}>
        {entries.map(({ fromLine, toLine, key, value }, index) => (
          <EntryRenderer
            key={`${depth}-${key}`}
            entryKey={key}
            toLine={toLine}
            depth={depth + 1}
            isLast={index === entries.length - 1}
            line={fromLine}
            value={value}
          />
        ))}
      </RootEnclosure>
    );
  }

  return (
    <>
      {entries.map(({ fromLine, key, toLine, value }, index) => (
        <EntryRenderer
          key={`${depth}-${key}`}
          entryKey={key}
          depth={depth + 1}
          toLine={toLine}
          isLast={index === entries.length - 1}
          line={fromLine}
          value={value}
        />
      ))}
    </>
  );
};
