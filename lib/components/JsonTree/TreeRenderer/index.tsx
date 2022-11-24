import React from "react";
import { ValidJSON } from "../../../types";
import { ValueRenderer } from "./ValueRenderer";

type Props = {
  data: ValidJSON;
};

export const TreeRenderer = ({ data }: Props) => {
  return (
    <pre>
      {typeof data === "object" && data !== null ? (
        JSON.stringify(data)
      ) : (
        <ValueRenderer data={data} />
      )}
    </pre>
  );
};
