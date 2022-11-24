import React from "react";
import { ValidJSON } from "../../../types";
import { PrimitiveRenderer } from "./PrimitiveRenderer";

type Props = {
  data: ValidJSON;
};

export const TreeRenderer = ({ data }: Props) => {
  return (
    <pre>
      {typeof data === "object" && data !== null ? (
        JSON.stringify(data)
      ) : (
        <PrimitiveRenderer data={data} />
      )}
    </pre>
  );
};
