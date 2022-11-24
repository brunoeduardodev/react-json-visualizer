import React from "react";
import { styled } from "../../../stitches.config";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  sq: "400px",
  minSq: "100px",
  padding: "16px",
  background: "$red300",
});

const Text = styled("p", {
  color: "$gray900",
  fontWeight: "bold",
  fontSize: "14px",
  textAlign: "center",
  fontFamily: "sans-serif",
});

export const InvalidTree = () => {
  return (
    <Container>
      <Text>Invalid Tree</Text>
    </Container>
  );
};
