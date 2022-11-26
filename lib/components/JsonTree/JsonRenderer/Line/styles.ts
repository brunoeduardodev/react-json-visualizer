import { styled } from "../../../../stitches.config";

export const LineContainer = styled("div", {
  display: "flex",
});

export const GutterContainer = styled("div", {
  display: "flex",
  position: "absolute",
  left: 0,
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

export const ContentContainer = styled("div", {
  display: "flex",
});
