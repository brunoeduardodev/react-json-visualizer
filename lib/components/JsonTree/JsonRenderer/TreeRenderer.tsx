import React, { useCallback, useMemo, useState } from "react";
import { generateLines, GenerateLinesOverrides } from "@/utils/generateLines";
import { generateSchema } from "@/utils/generateSchema";
import { LineRenderer } from "./LineRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  const [linesOverride, setLinesOverride] = useState<GenerateLinesOverrides[]>([]);

  const lines = useMemo(() => {
    const schema = generateSchema({ key: null, value: data });
    return generateLines(schema, {}, linesOverride);
  }, [data, linesOverride]);

  const onExpand = useCallback((lineNumber: number) => {
    setLinesOverride((prev) => {
      if (prev.find((override) => override.line === lineNumber)) {
        return prev.map((prevOverride) => {
          return prevOverride.line === lineNumber
            ? { ...prevOverride, expanded: !prevOverride.expanded }
            : prevOverride;
        });
      }

      return [...prev, { line: lineNumber, expanded: true }];
    });
  }, []);

  return (
    <>
      {lines.map((line, i) => (
        <LineRenderer key={i} line={line} onExpand={onExpand} />
      ))}
    </>
  );
};
