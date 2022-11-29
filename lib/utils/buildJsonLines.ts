import { ValueSchema } from "../types";
import { getTotalLinesFromSchema, getValueSchema } from "./getValueSchema";

type BaseLine = {
  line: number;
  isVisible: boolean;
  key: string | null;
  depth: number;

  parent: EnclosureLine | null;
};

type SimpleLine = ValueSchema & BaseLine;

type EnclosureLine = {
  enclosureType: "curly" | "brackets";
  expanded: boolean;
  type: "opening" | "closing";
} & BaseLine;

type Line = SimpleLine | EnclosureLine;

const getLinesFromTree = (
  entry: ValueSchema,
  parent: EnclosureLine | null,
  lineOffset: number,
  depth: number
): Line[] => {
  const lines: Line[] = [];

  if ("entries" in entry) {
    const enclosureOpening: EnclosureLine = {
      expanded: true,
      isVisible: !!parent?.isVisible,
      key: entry.key,
      line: lineOffset + 1,
      parent: parent,
      enclosureType: entry.type === "object" ? "curly" : "brackets",
      type: "opening",
      depth,
    };

    let entryOffsetAccumulator = 0;
    const insideLines = entry.entries.flatMap((entry, index) => {
      const newLines = getLinesFromTree(
        entry,
        enclosureOpening,
        lineOffset + entryOffsetAccumulator + 1,
        depth + 1
      );

      entryOffsetAccumulator += getTotalLinesFromSchema(entry);

      return newLines;
    });

    const enclosureEnd: EnclosureLine = {
      expanded: true,
      isVisible: enclosureOpening.isVisible,
      enclosureType: entry.type === "object" ? "curly" : "brackets",
      key: entry.key,
      line: lineOffset + entryOffsetAccumulator + 2,
      parent,
      type: "closing",
      depth,
    };
    return [enclosureOpening, ...insideLines, enclosureEnd];
  }

  return [
    {
      ...entry,
      line: lineOffset + 1,
      parent,
      depth,
      isVisible: true,
    },
  ];
};

console.log(
  getLinesFromTree(
    getValueSchema({
      key: null,
      value: JSON.parse(
        JSON.stringify({
          john: "doe",
          nested: {
            isNested: true,
            level: 1,
            deepNested: {
              isDeepTested: true,
              level: 2,
              oneMore: {
                isThreeTimesNested: true,
                level: 4,
              },
            },
          },
        })
      ),
    }),
    null,
    0,
    0
  )
);
