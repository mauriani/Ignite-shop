import { useContext } from "react";
import { ShoppingBag } from "phosphor-react";
import { ComponentProps } from "react";

import { CartContext } from "../../context/CartContext";

import { ButtonContainer } from "./styles";

type CartButtonProps = ComponentProps<typeof ButtonContainer>;

export function CartButton({ ...rest }: CartButtonProps) {
  const { totalBagItems } = useContext(CartContext);

  return (
    <ButtonContainer {...rest}>
      <ShoppingBag size={25} />
      {totalBagItems >= 1 && <span>{totalBagItems}</span>}
    </ButtonContainer>
  );
}
