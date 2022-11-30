import React from "react";
import { Line } from "../../../../utils/generateLines";
import { KeyRenderer } from "../AtomRenderer/KeyRenderer";
import { ValueRenderer } from "../AtomRenderer/ValueRenderer";
import {
  DepthSpacer,
  EnclosureCharacter,
  ExpandButton,
  ExpandIcon,
  GutterContainer,
  LineContainer,
  LineNumber,
} from "./styles";

type Props = {
  line: Line;
};

export const LineRenderer = ({ line }: Props) => {
  if (!line.isVisible) return null;
  if (!line.isEnclosure) {
    const { depth, line: lineNumber, key, value } = line;
    return (
      <LineContainer>
        <GutterContainer>
          <LineNumber>{lineNumber}</LineNumber>
        </GutterContainer>

        <DepthSpacer>
          {Array(depth)
            .fill(" ")
            .map((_, i) => (
              <span key={i}>&nbsp;</span>
            ))}
        </DepthSpacer>

        {key && (
          <>
            <KeyRenderer data={key} />
            {": "}
          </>
        )}

        <ValueRenderer data={value} />
      </LineContainer>
    );
  }

  const { depth, enclosureType, expanded, key, type, line: lineNumber } = line;
  if (type === "closing") {
    return (
      <LineContainer>
        <GutterContainer>
          <LineNumber>{lineNumber}</LineNumber>
        </GutterContainer>

        <DepthSpacer>
          {Array(depth)
            .fill(" ")
            .map((_, i) => (
              <span key={i}>&nbsp;</span>
            ))}
        </DepthSpacer>

        <EnclosureCharacter>
          {enclosureType === "curly" && "}"}
          {enclosureType === "brackets" && "]"}
        </EnclosureCharacter>
      </LineContainer>
    );
  }

  if (!expanded) {
    return (
      <LineContainer>
        <GutterContainer>
          <LineNumber>{lineNumber}</LineNumber>
        </GutterContainer>

        <DepthSpacer>
          {Array(depth)
            .fill(" ")
            .map((_, i) => (
              <span key={i}>&nbsp;</span>
            ))}
        </DepthSpacer>

        {key && (
          <>
            <KeyRenderer data={key} />
            {": "}
          </>
        )}

        <EnclosureCharacter>
          {enclosureType === "curly" && "{"}
          {enclosureType === "brackets" && "["}
        </EnclosureCharacter>

        <ExpandButton>
          <ExpandIcon />
        </ExpandButton>

        <EnclosureCharacter>
          {enclosureType === "curly" && "}"}
          {enclosureType === "brackets" && "]"}
        </EnclosureCharacter>
      </LineContainer>
    );
  }

  return (
    <LineContainer>
      <GutterContainer>
        <LineNumber>{lineNumber}</LineNumber>
      </GutterContainer>

      <DepthSpacer>
        {Array(depth)
          .fill(" ")
          .map((_, i) => (
            <span key={i}>&nbsp;</span>
          ))}
      </DepthSpacer>

      {key && (
        <>
          <KeyRenderer data={key} />
          {": "}
        </>
      )}

      <EnclosureCharacter>
        {enclosureType === "curly" && "{"}
        {enclosureType === "brackets" && "["}
      </EnclosureCharacter>
    </LineContainer>
  );
};
