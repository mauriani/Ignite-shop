import { useContext } from "react";
import { ShoppingBag } from "phosphor-react";
import { ComponentProps } from "react";

import { CartContext } from "../../context/CartContext";

import { ButtonContainer } from "./styles";

type CartButtonProps = ComponentProps<typeof ButtonContainer>;

export function CartButton({ ...rest }: CartButtonProps) {
  const { totalBag } = useContext(CartContext);

  return (
    <ButtonContainer {...rest}>
      <ShoppingBag size={25} />
      {totalBag >= 1 && <span>{totalBag}</span>}
    </ButtonContainer>
  );
}
