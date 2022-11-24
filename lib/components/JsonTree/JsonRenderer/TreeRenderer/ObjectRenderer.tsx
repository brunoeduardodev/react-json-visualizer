import React from "react";
import { Enclosure } from "./Enclosure";

type Props = {
  data: object;
};
export const ObjectRenderer = ({ data }: Props) => {
  const entries = Object.entries(data);

  return (
    <Enclosure type="curly">
      {entries.map(([key, value]) => (
        <div key={key}>
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </Enclosure>
  );
};
