import {
  BooleanSchema,
  NullSchema,
  NumberSchema,
  StringSchema,
  ValidJSON,
} from "./types";
import { getLinesDifference } from "./utils/lines";

type BaseEntry = {
  key: string | null;
};

type StringEntry = StringSchema & BaseEntry;

type NumberEntry = NumberSchema & BaseEntry;

type BooleanEntry = BooleanSchema & BaseEntry;

type NullEntry = NullSchema & BaseEntry;

type ArrayEntry = {
  type: "array";
  entries: ParsedEntry[];
} & BaseEntry;

type ObjectEntry = {
  type: "object";
  entries: ParsedEntry[];
} & BaseEntry;

type ParsedEntry =
  | StringEntry
  | NumberEntry
  | BooleanEntry
  | NullEntry
  | ArrayEntry
  | ObjectEntry;

type Options = {
  key: string | null;
  value: ValidJSON;
};

export const parseJson = ({ key, value }: Options): ParsedEntry => {
  if (typeof value === "string") {
    return {
      type: "string",
      key,
      value,
    };
  }

  if (typeof value === "number") {
    return {
      type: "number",
      key,
      value,
    };
  }

  if (typeof value === "boolean") {
    return {
      type: "boolean",
      key,
      value,
    };
  }

  if (value === null) {
    return {
      type: "null",
      key,
      value,
    };
  }

  if (Array.isArray(value)) {
    return {
      type: "array",
      key,
      entries: value,
    };
  }

  const parsed: ObjectEntry = {
    type: "object",
    key,
    entries: Object.entries(value).map(([key, value], index) => {
      return parseJson({
        key,
        value,
      });
    }),
  };

  return parsed;
};

type BaseLine = {
  line: number;
  isVisible: boolean;
  key: string | null;
  depth: number;

  parent: EnclosureLine | null;
};

type ValueLine = (StringSchema | NumberSchema | NullSchema | BooleanSchema) &
  BaseLine;

type EnclosureLine = {
  enclosureType: "curly" | "brackets";
  expanded: boolean;
  type: "opening" | "closing";
} & BaseLine;

type ParsedLine = ValueLine | EnclosureLine;

const getEntryLines = (entryData: ParsedEntry | ParsedEntry[]): number => {
  if (Array.isArray(entryData)) {
    return (
      1 +
      entryData.reduce((total, entry) => {
        return getEntryLines(entry) + total;
      }, 0)
    );
  }

  if ("entries" in entryData) {
    return 1 + getEntryLines(entryData.entries);
  }

  return 1;
};

const getLinesFromTree = (
  entry: ParsedEntry,
  parent: EnclosureLine | null,
  lineOffset: number,
  depth: number
): ParsedLine[] => {
  const lines: ParsedLine[] = [];

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

      entryOffsetAccumulator += getEntryLines(entry);

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

  if (entry.type === "string") {
    const { key, type, value } = entry;
    return [
      {
        line: lineOffset + 1,
        key,
        parent,
        type,
        value,
        isVisible: true,
        depth,
      },
    ];
  }

  if (entry.type === "number") {
    const { key, type, value } = entry;
    return [
      {
        line: lineOffset + 1,
        key,
        parent,
        type,
        value,
        isVisible: true,
        depth,
      },
    ];
  }

  if (entry.type === "boolean") {
    const { key, type, value } = entry;
    return [
      {
        line: lineOffset + 1,
        key,
        parent,
        type,
        value,
        isVisible: true,
        depth,
      },
    ];
  }

  if (entry.type === "null") {
    const { key, type, value } = entry;
    return [
      {
        line: lineOffset + 1,
        key,
        parent,
        type,
        value,
        isVisible: true,
        depth,
      },
    ];
  }

  return lines;
};

console.log(
  getLinesFromTree(
    parseJson({
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
