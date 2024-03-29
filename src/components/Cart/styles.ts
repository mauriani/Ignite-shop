import { styled } from "../../styles";

import * as Dialog from "@radix-ui/react-dialog";

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "30rem",
  background: "$gray800",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "-4px 0px 30px rgba(0,0,0,0.8)",
  display: "flex",
  flexDirection: "column",

  h2: {
    fontWeight: 700,
    fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
  },
});

export const CartClose = styled(Dialog.Close, {
  background: "none",
  border: "none",
  color: "$gray500",
  position: "absolute",
  top: "1.75rem",
  right: "1.75rem",
});

export const CartProduct = styled("div", {
  width: "100%",
  height: "5.8125rem",
  gap: "1.25rem",
  alignItems: "center",
  marginBottom: "1.25rem",
  display: "flex",
});

export const EmptyBag = styled("div", {
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  p: {
    color: "$gray300",
    fontSize: "$md",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
});

export const CartProductImage = styled("div", {
  width: "6.3125rem",
  height: "5.8125rem",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: 8,

  img: {
    objectFit: "cover",
  },
});

export const CartProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",

  p: {
    color: "$gray300",
    fontSize: "$md",
  },

  strong: {
    marginTop: 4,
    fontSize: "$md",
    fontWeight: 700,
  },

  div: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "2.5rem",

    marginTop: "0.8rem",

    button: {
      background: "$green500",
      width: "2rem",
      height: "2rem",
      color: "$white",
      border: "none",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      borderRadius: 3,
    },

    input: {
      width: "2rem",
      height: "2rem",
      border: "none",
      outline: "none",
      background: "none",
      color: "$gray100",
      textAlign: "center !important",
    },
  },
});

export const CartProductFooter = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",

  button: {
    width: "100%",
    background: "$green500",
    color: "$white",
    fontSize: "$md",
    height: "4.3125rem",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      background: "$green300",
    },
  },
});

export const Details = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 55,

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    p: {
      fontSize: "$md",
      color: "$gray300",
    },

    // pegando a ultima div
    "&:last-child": {
      fontWeight: "bold",

      span: {
        fontSize: "$md",
      },

      p: {
        fontSize: "$xl",
        color: "$gray100",
      },
    },
  },
});
