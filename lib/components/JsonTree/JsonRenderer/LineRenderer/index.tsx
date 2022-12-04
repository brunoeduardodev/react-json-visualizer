import React from "react";
import { Line } from "@/utils/generateLines";
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

type LineSkeletonProps = {
  property: string | null;
  line: number;
  depth: number;
  children: React.ReactNode;

  showComma: boolean;
};

export const LineSkeleton = ({ property, line, depth, children, showComma }: LineSkeletonProps) => {
  return (
    <LineContainer>
      <GutterContainer>
        <LineNumber>{line}</LineNumber>
      </GutterContainer>

      <DepthSpacer>
        {Array(depth)
          .fill(" ")
          .map((_, i) => (
            <span key={i}>&nbsp;&nbsp;</span>
          ))}
      </DepthSpacer>

      {property && (
        <>
          <KeyRenderer data={property} />
          {": "}
        </>
      )}

      {children}

      {showComma && <span>,</span>}
    </LineContainer>
  );
};

type Props = {
  line: Line;
  onExpand?: (line: Line) => void;
};

export const LineRenderer = ({ line, onExpand }: Props) => {
  if (!line.isVisible) return null;
  if (!line.isEnclosure) {
    const { depth, line: lineNumber, key, value, hasNext } = line;
    return (
      <LineSkeleton line={lineNumber} depth={depth} property={key} showComma={hasNext}>
        <ValueRenderer data={value} />
      </LineSkeleton>
    );
  }

  const { depth, enclosureType, expanded, key, type, line: lineNumber, hasNext } = line;
  if (type === "closing") {
    return (
      <LineSkeleton depth={depth} line={lineNumber} property={null} showComma={hasNext}>
        <EnclosureCharacter>
          {enclosureType === "curly" && "}"}
          {enclosureType === "brackets" && "]"}
        </EnclosureCharacter>
      </LineSkeleton>
    );
  }

  if (!expanded) {
    return (
      <LineSkeleton property={key} line={lineNumber} depth={depth} showComma={hasNext}>
        <EnclosureCharacter>
          {enclosureType === "curly" && "{"}
          {enclosureType === "brackets" && "["}
        </EnclosureCharacter>

        <ExpandButton onClick={() => onExpand && onExpand(line)}>
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
    <LineSkeleton depth={depth} line={lineNumber} property={key} showComma={false}>
      <EnclosureCharacter>
        {enclosureType === "curly" && "{"}
        {enclosureType === "brackets" && "["}
      </EnclosureCharacter>
    </LineSkeleton>
  );
};
