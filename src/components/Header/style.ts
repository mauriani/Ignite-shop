import { styled } from "../../styles";

export const Container = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,

    position: "relative",

    width: "2.3rem",
    height: "2.3rem",
    border: 0,
    borderRadius: 6,
    background: "$gray800",
    color: "$gray300",

    span: {
      position: "absolute",
      top: "-0.50rem",
      right: "-0.50rem",
      border: "3px solid #121214",
      borderRadius: "100%",

      width: "1.6rem",
      height: "1.6rem",

      textAlign: "center",

      fontsize: "14",
      color: "$gray100",
      background: "$green500",
      fontWeight: "bold",
    },
  },
});
