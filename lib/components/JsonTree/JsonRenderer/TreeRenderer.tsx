import React from "react";
import { generateLines } from "@/utils/generateLines";
import { generateSchema } from "@/utils/generateSchema";
import { LineRenderer } from "./LineRenderer";

type Props = {
  data: object;
};

export const TreeRenderer = ({ data }: Props) => {
  const schema = generateSchema({ key: null, value: data });
  const lines = generateLines(schema, null, 0, 0);

  return (
    <>
      {lines.map((line, i) => (
        <LineRenderer key={i} line={line} />
      ))}
    </>
  );
};
