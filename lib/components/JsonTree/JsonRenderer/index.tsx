import React from "react";
import { ValidJSON } from "../../../types";
import { TreeRenderer } from "./TreeRenderer";
import { ValueRenderer } from "./AtomRenderer/ValueRenderer";

type Props = {
  data: ValidJSON;
};

export const JsonRenderer = ({ data }: Props) => {
  return (
    <pre>
      {typeof data === "object" && data !== null ? (
        <TreeRenderer data={data} />
      ) : (
        <ValueRenderer depth={0} lineOffset={0} data={data} />
      )}
    </pre>
  );
};
