import React from "react";
import { safeParse } from "../../utils/safeParse";
import { Container } from "./Container";
import { TreeRenderer } from "./TreeRenderer";

type Props = {
  src: unknown;
};

export const JsonTree = ({ src }: Props) => {
  const { data, error } = safeParse(src);

  return (
    <Container>
      <TreeRenderer data={error ? "Invalid JSON" : data} />
    </Container>
  );
};
