import React from "react";
import { PropsWithChildren } from "react";
import {
  ExpandGutter,
  GutterContainer,
  LineContainer,
  LineGutter,
} from "./styles";

const TAB_SIZE = 4;
const SPACE_CHARACTER_SIZE = 8;

type Props = {
  depth: number;
  line: number;
};

export const Line = ({ depth, line, children }: PropsWithChildren<Props>) => {
  const leftPadding = `${TAB_SIZE * SPACE_CHARACTER_SIZE * depth}px`;

  return (
    <LineContainer css={{ pl: leftPadding }}>
      <GutterContainer css={{ left: `-${leftPadding}` }}>
        <LineGutter>{line}</LineGutter>
        <ExpandGutter />
      </GutterContainer>
      {children}
    </LineContainer>
  );
};
