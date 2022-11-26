import { WidthIcon } from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { styled } from "../../../stitches.config";
import { Line } from "./Line";

type Props = {
  type: "curly" | "brackets";
  name?: string;

  isRoot?: boolean;
  toLine?: number;
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

export const Container = styled("div", {
  display: "flex",
  position: "relative",

  variants: {
    open: {
      true: {
        flexDirection: "column",
      },
      false: {
        flexDirection: "row",
      },
    },
  },
});

export const EnclosureContent = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Enclosure = ({
  type,
  children,
  isRoot,
  toLine,
}: PropsWithChildren<Props>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container open={expanded}>
      {isRoot ? (
        <Line depth={0} line={1}>
          <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
        </Line>
      ) : (
        <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
      )}
      {expanded ? (
        <EnclosureContent>{children}</EnclosureContent>
      ) : (
        <ExpandButton onClick={() => setExpanded(true)}>
          <ExpandIcon />
        </ExpandButton>
      )}

      {isRoot && expanded ? (
        <Line depth={0} line={toLine!}>
          <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
        </Line>
      ) : (
        <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
      )}
    </Container>
  );
};
