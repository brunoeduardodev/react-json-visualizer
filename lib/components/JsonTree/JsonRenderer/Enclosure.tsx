import { WidthIcon } from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { styled } from "../../../stitches.config";
import { Line, LineProps } from "./Line";

type Props = {
  type: "curly" | "brackets";
  name?: string;

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

export const RootEnclosure = ({ type, children, toLine }: PropsWithChildren<Props>) => {
  return (
    <>
      <Line depth={0} line={1}>
        <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
      </Line>
      {children}
      <Line depth={0} line={toLine!}>
        <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
      </Line>
    </>
  );
};

type WithEnclosureProps = {
  enclosed: React.ReactNode;
  children: React.ReactNode;
  type: "curly" | "brackets";

  toLine: number;
} & LineProps;

export const WithEnclosure = ({ children, enclosed, type, toLine, ...line }: WithEnclosureProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!expanded)
    return (
      <>
        <Line {...line}>
          {children}
          <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
          <ExpandButton onClick={() => setExpanded((expanded) => !expanded)}>
            <ExpandIcon />
          </ExpandButton>
          <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
        </Line>
      </>
    );

  return (
    <>
      <Line {...line}>
        {children}
        <EncloseCharacter>{KeysMap[type].open}</EncloseCharacter>
      </Line>
      {enclosed}
      <Line {...line} line={toLine}>
        <EncloseCharacter>{KeysMap[type].close}</EncloseCharacter>
      </Line>
    </>
  );
};
