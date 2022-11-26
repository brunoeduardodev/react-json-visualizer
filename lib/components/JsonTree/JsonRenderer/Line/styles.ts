import { styled } from "../../../../stitches.config";

export const LineContainer = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const GutterContainer = styled("div", {
  display: "flex",
  position: "relative",
});

export const LineGutter = styled("div", {
  color: "$line",
  width: "$5",
  position: "relative",

  textAlign: "end",
});

export const ExpandGutter = styled("div", {
  width: "$4",
});
