import { styled } from "@stitches/react";

export const Cell = styled("span", {
  fontSize: "$md",

  variants: {
    type: {
      string: {
        color: "$string",
      },
      number: {
        color: "$blue500",
      },
      boolean: {
        color: "$green500",
      },
      null: {
        color: "$gray500",
      },
    },
  },
});
