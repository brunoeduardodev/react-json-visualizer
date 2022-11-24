import { WidthIcon } from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { styled } from "../../../../stitches.config";

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
  alignItems: "center",
});

export const Enclosure = ({
  type,
  name,
  children,
}: PropsWithChildren<Props>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      {name && `${name} : `}{" "}
      <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
      {expanded ? (
        children
      ) : (
        <ExpandButton onClick={() => setExpanded(true)}>
          <ExpandIcon />
        </ExpandButton>
      )}
      <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
    </Container>
  );
};
