import { PrimitiveSchemas, ValueSchema } from "../types";
import { getTotalLinesFromSchema, generateSchema } from "./generateSchema";

type BaseLine = {
  line: number;
  isVisible: boolean;
  key: string | null;
  depth: number;

  parent: EnclosureLine | null;
  hasNext: boolean;
};

type SimpleLine = PrimitiveSchemas & BaseLine & { isEnclosure: false };

type EnclosureLine = {
  enclosureType: "curly" | "brackets";
  expanded: boolean;
  type: "opening" | "closing";
  isEnclosure: true;

  totalChildren: number;
} & BaseLine;

export type Line = SimpleLine | EnclosureLine;

export const generateLines = (
  entry: ValueSchema,
  parent: EnclosureLine | null,
  lineOffset = 0,
  depth = 0,
  keyIndex = 0
): Line[] => {
  if ("entries" in entry) {
    const enclosureType = entry.type === "object" ? "curly" : "brackets";

    const enclosure = {
      enclosureType,
      expanded: true,
      key: entry.key,
      depth,
      parent,
      isEnclosure: true,
      totalChildren: entry.entries.length,

      get isVisible() {
        return this.parent ? this.parent.isVisible && this.parent.expanded : true;
      },

      get hasNext() {
        if (!this.parent) return false;
        return this.parent.totalChildren > keyIndex + 1;
      },
    } as const;

    const enclosureOpening: EnclosureLine = {
      ...enclosure,
      line: lineOffset + 1,
      type: "opening",
    };

    let contentLines = 0;
    const insideLines = entry.entries.flatMap((entry, index) => {
      const insideLines = generateLines(entry, enclosureOpening, lineOffset + contentLines + 1, depth + 1, index);

      contentLines += getTotalLinesFromSchema(entry);

      return insideLines;
    });

    const enclosureEnd: EnclosureLine = {
      ...enclosure,
      line: lineOffset + contentLines + 2,
      type: "closing",
    };
    return [enclosureOpening, ...insideLines, enclosureEnd];
  }

  return [
    {
      ...entry,
      line: lineOffset + 1,
      parent,
      depth,
      isEnclosure: false,
      get isVisible() {
        return !!this.parent?.isVisible;
      },
      get hasNext() {
        if (!this.parent) return false;
        return this.parent.totalChildren > keyIndex + 1;
      },
    },
  ];
};
