import { WidthIcon } from "@radix-ui/react-icons";
import React, { useMemo, useState } from "react";
import { styled } from "../../../../stitches.config";
import { Primitive, ValidJSON } from "../../../../types";
import {
  getEntriesWithLines,
  getLinesDifference,
} from "../../../../utils/lines";
import { KeyRenderer } from "../AtomRenderer/KeyRenderer";
import { ValueRenderer } from "../AtomRenderer/ValueRenderer";
import {
  ContentContainer,
  ExpandGutter,
  GutterContainer,
  LineContainer,
  LineGutter,
} from "./styles";

type Props = {
  depth: number;
  line: number;

  field?: string;
  value: ValidJSON;
  isLast: boolean;
};

const KeysMap = {
  curly: {
    open: "{",
    close: "}",
  },
  brackets: {
    open: "[",
    close: "]",
  },
};

const EncloseCharacter = styled("span", {
  color: "$gray800",
  fontWeight: "bold",
});

const ExpandButton = styled("button", {
  background: "transparent",
  border: "none",
  p: "1px",
  borderRadius: "$round",
  cursor: "pointer",

  "&:hover, &:focus": {
    background: "$gray100",
  },
});

const ExpandIcon = styled(WidthIcon, {
  color: "$blue500",
  fontSize: "$sm",
});

const TAB_SIZE = 4;
const SPACE_CHARACTER_SIZE = 4;

export const LineRenderer = ({ depth, line, field, value, isLast }: Props) => {
  const leftPadding = `${32 + TAB_SIZE * SPACE_CHARACTER_SIZE * depth}px`;
  const [expanded, setExpanded] = useState(depth < 3);

  const enclosure = useMemo(() => {
    if (typeof value !== "object" || value === null) return undefined;

    const toLine = getLinesDifference(value) + line;
    return { value, toLine };
  }, [value, line]);

  return (
    <>
      <LineContainer>
        <GutterContainer>
          <LineGutter>{line}</LineGutter>
          <ExpandGutter />
        </GutterContainer>
        <ContentContainer css={{ paddingLeft: leftPadding }}>
          {field ? (
            <>
              <KeyRenderer data={field} />:{" "}
            </>
          ) : null}

          {enclosure ? (
            <>
              {expanded ? (
                <EncloseCharacter>{KeysMap["curly"].open}</EncloseCharacter>
              ) : (
                <>
                  <EncloseCharacter>{KeysMap["curly"].open}</EncloseCharacter>
                  <ExpandButton onClick={() => setExpanded(true)}>
                    <ExpandIcon />
                  </ExpandButton>
                  <EncloseCharacter>{KeysMap["curly"].close}</EncloseCharacter>
                  {isLast ? "" : ","}
                </>
              )}
            </>
          ) : (
            <>
              <ValueRenderer data={value as Primitive} />
              {isLast ? "" : ","}
            </>
          )}
        </ContentContainer>
      </LineContainer>

      {enclosure ? (
        <>
          {expanded ? (
            <>
              {getEntriesWithLines(value as object, line).map(
                ({ key, value, fromLine, toLine }, index, entries) => (
                  <LineRenderer
                    depth={depth + 1}
                    line={fromLine}
                    value={value}
                    field={key}
                    key={`${depth} - ${key}`}
                    isLast={index === entries.length - 1}
                  />
                )
              )}

              <LineContainer>
                <GutterContainer>
                  <LineGutter>{enclosure.toLine}</LineGutter>
                  <ExpandGutter />
                </GutterContainer>

                <ContentContainer css={{ pl: leftPadding }}>
                  <EncloseCharacter>{KeysMap["curly"].close}</EncloseCharacter>
                </ContentContainer>
              </LineContainer>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};
