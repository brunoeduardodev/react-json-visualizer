import { styled } from "@stitches/react";
import React from "react";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  height: "400px",
  minWidth: "100px",
  minHeight: "100px",
  padding: "16px",
  background: "hsl(0, 100%, 90%, 0.5)",
});

const Text = styled("p", {
  color: "red",
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
