import { WidthIcon } from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { styled } from "../../../stitches.config";

type Props = {
  type: "curly" | "brackets";
  name?: string;
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

export const Enclosure = ({ type, children }: PropsWithChildren<Props>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container open={expanded}>
      <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
      {expanded ? (
        <EnclosureContent>{children}</EnclosureContent>
      ) : (
        <ExpandButton onClick={() => setExpanded(true)}>
          <ExpandIcon />
        </ExpandButton>
      )}
      <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
    </Container>
  );
};
