import React from "react";
import { safeParse } from "../../utils/safeParse";
import { Container } from "./Container";
import { InvalidTree } from "./InvalidTree";

type Props = {
  src: unknown;
};

export const JsonTree = ({ src }: Props) => {
  const { data, error } = safeParse(src);

  if (error) {
    return (
      <Container>
        <InvalidTree />
      </Container>
    );
  }

  return <Container></Container>;
};
