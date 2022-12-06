import React, { useMemo, useState } from "react";
import { generateLines } from "@/utils/generateLines";
import { generateSchema } from "@/utils/generateSchema";
import { LineRenderer } from "./LineRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  const [expandedLines, setExpandedLines] = useState<number[]>([]);

  const lines = useMemo(() => {
    const schema = generateSchema({ key: null, value: data });
    return generateLines(schema, {});
  }, [data]);

  return (
    <>
      {lines.map((line, i) => (
        <LineRenderer key={i} line={line} />
      ))}
    </>
  );
};
