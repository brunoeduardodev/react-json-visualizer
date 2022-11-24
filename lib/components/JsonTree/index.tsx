import React from "react";
import { safeParse } from "../../utils/safeParse";
import { InvalidTree } from "../InvalidTree";

type Props = {
  src: unknown;
};

export const JsonTree = ({ src }: Props) => {
  const { data, error } = safeParse(src);

  if (error) {
    return <InvalidTree />;
  }

  return <pre>{typeof data === "object" ? JSON.stringify(data) : data}</pre>;
};
