import { ValueSchema } from "../types";
import { getTotalLinesFromSchema, generateSchema } from "./generateSchema";

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

const generateLines = (
  entry: ValueSchema,
  parent: EnclosureLine | null,
  lineOffset: number,
  depth: number
): Line[] => {
  if ("entries" in entry) {
    const enclosureType = entry.type === "object" ? "curly" : "brackets";

    const enclosure = {
      enclosureType,
      expanded: true,
      key: entry.key,
      depth,
      parent,

      get isVisible() {
        return this.parent
          ? this.parent.isVisible && this.parent.expanded
          : true;
      },
    } as const;

    const enclosureOpening: EnclosureLine = {
      ...enclosure,
      line: lineOffset + 1,
      type: "opening",
    };

    let contentLines = 0;
    const insideLines = entry.entries.flatMap((entry, index) => {
      const insideLines = generateLines(
        entry,
        enclosureOpening,
        lineOffset + contentLines + 1,
        depth + 1
      );

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
      get isVisible() {
        return !!this.parent?.isVisible;
      },
    },
  ];
};

console.log(
  generateLines(
    generateSchema({
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
