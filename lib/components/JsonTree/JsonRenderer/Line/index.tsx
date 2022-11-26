import React from "react";
import { PropsWithChildren } from "react";
import {
  ContentContainer,
  ExpandGutter,
  GutterContainer,
  LineContainer,
  LineGutter,
} from "./styles";

const TAB_SIZE = 4;
const SPACE_CHARACTER_SIZE = 4;

export type LineProps = {
  depth: number;
  line: number;
};

export const Line = ({
  depth,
  line,
  children,
}: PropsWithChildren<LineProps>) => {
  const leftPadding = `${32 + TAB_SIZE * SPACE_CHARACTER_SIZE * depth}px`;

  return (
    <LineContainer>
      <GutterContainer>
        <LineGutter>{line}</LineGutter>
        <ExpandGutter />
      </GutterContainer>
      <ContentContainer
        css={{
          paddingLeft: leftPadding,
        }}
      >
        {children}
      </ContentContainer>
    </LineContainer>
  );
};
