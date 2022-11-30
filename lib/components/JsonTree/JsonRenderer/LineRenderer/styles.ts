import { WidthIcon } from "@radix-ui/react-icons";
import { styled } from "../../../../stitches.config";

export const LineContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const GutterContainer = styled("div", {
  display: "flex",

  width: "$8",
});

export const LineNumber = styled("span", {
  color: "$gray700",
  fontSize: "$sm",
  width: "$6",
  textAlign: "right",
});

export const DepthSpacer = styled("span", {});

export const EnclosureCharacter = styled("span", {
  color: "$gray900",
  fontSize: "$md",
  fontWeight: "bold",
});

export const ExpandButton = styled("button", {
  background: "transparent",
  border: "none",
  p: "1px",
  borderRadius: "$round",
  cursor: "pointer",

  "&:hover, &:focus": {
    background: "$gray100",
  },
});

export const ExpandIcon = styled(WidthIcon, {
  color: "$blue500",
  fontSize: "$sm",
});
