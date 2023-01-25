import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  // gap: "3rem",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 500,

  paddingBottom: 20,
});

export const ProductContainer = styled("div", {});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  // padding: "0.25rem",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    background: "rgba(0,0,0,0.6)",
    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    button: {
      background: "$green500",
      width: "3.5rem",
      height: "3.5rem",

      border: 0,
      color: "$white",
      borderRadius: 6,

      "&:hover": {
        background: "$green300",
      },
    },

    div: {
      display: "flex",
      flexDirection: "column",

      strong: {
        fontsize: "$2xl",
        color: "$gray100",
        maginBottom: 4,
      },

      span: {
        fontsize: "$2xl",
        fontWeight: "bold",
        color: "$green300",
      },
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
