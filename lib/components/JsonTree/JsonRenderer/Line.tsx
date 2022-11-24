import React from "react";
import { PropsWithChildren } from "react";
import { styled } from "../../../stitches.config";

type Props = {
  depth: number;
  line: number;
};

const TAB_SIZE = 4;
const SPACE_CHARACTER_SIZE = 8;

const LineContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const Line = ({ depth, line, children }: PropsWithChildren<Props>) => {
  return (
    <LineContainer css={{ pl: `${TAB_SIZE * SPACE_CHARACTER_SIZE * depth}px` }}>
      {children},
    </LineContainer>
  );
};
