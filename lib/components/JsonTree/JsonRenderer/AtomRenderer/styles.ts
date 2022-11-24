import { styled } from "../../../../stitches.config";

export const Cell = styled("span", {
  fontSize: "$md",

  variants: {
    type: {
      string: {
        color: "$string",
      },
      number: {
        color: "$number",
      },
      boolean: {
        color: "$boolean",
      },
      null: {
        color: "$null",
      },
      key: {
        color: "$key",
      },
    },
  },
});
