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

type LineSkeletonProps = {
  property: string | null;
  line: number;
  depth: number;
  children: React.ReactNode;
};

export const LineSkeleton = ({ property, line, depth, children }: LineSkeletonProps) => {
  return (
    <LineContainer>
      <GutterContainer>
        <LineNumber>{line}</LineNumber>
      </GutterContainer>

      <DepthSpacer>
        {Array(depth)
          .fill(" ")
          .map((_, i) => (
            <span key={i}>&nbsp;</span>
          ))}
      </DepthSpacer>

      {property && (
        <>
          <KeyRenderer data={property} />
          {": "}
        </>
      )}

      {children}
    </LineContainer>
  );
};

export const LineRenderer = ({ line }: Props) => {
  if (!line.isVisible) return null;
  if (!line.isEnclosure) {
    const { depth, line: lineNumber, key, value } = line;
    return (
      <LineSkeleton line={lineNumber} depth={depth} property={key}>
        <ValueRenderer data={value} />
      </LineSkeleton>
    );
  }

  const { depth, enclosureType, expanded, key, type, line: lineNumber } = line;
  if (type === "closing") {
    return (
      <LineSkeleton depth={depth} line={lineNumber} property={null}>
        <EnclosureCharacter>
          {enclosureType === "curly" && "}"}
          {enclosureType === "brackets" && "]"}
        </EnclosureCharacter>
      </LineSkeleton>
    );
  }

  if (!expanded) {
    return (
      <LineSkeleton property={key} line={lineNumber} depth={depth}>
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
      </LineSkeleton>
    );
  }

  return (
    <LineSkeleton depth={depth} line={lineNumber} property={key}>
      <EnclosureCharacter>
        {enclosureType === "curly" && "{"}
        {enclosureType === "brackets" && "["}
      </EnclosureCharacter>
    </LineSkeleton>
  );
};
