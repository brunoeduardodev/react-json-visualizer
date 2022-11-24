import React from "react";
import { safeParse } from "../../utils/safeParse";
import { Container } from "./Container";
import { JsonRenderer } from "./JsonRenderer";

type Props = {
  src: unknown;
};

export const JsonTree = ({ src }: Props) => {
  const { data, error } = safeParse(src);

  return (
    <Container>
      <JsonRenderer data={error ? "Invalid JSON" : data} />
    </Container>
  );
};
