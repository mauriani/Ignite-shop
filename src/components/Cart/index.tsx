import { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "phosphor-react";

import { CartContext } from "../../context/CartContext";

import { CartButton } from "../CartButton";

import {
  CartContent,
  CartClose,
  CartProduct,
  CartProductImage,
  CartProductDetails,
  CartProductFooter,
  Details,
} from "./styles";

export function Cart() {
  const { productsBag } = useContext(CartContext);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {/* <p>Parece que o seu carrinho está vazio!</p> */}

            {productsBag.map((product) => (
              <CartProduct key={product.id}>
                <CartProductImage>
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={93}
                    alt=""
                  />
                </CartProductImage>

                <CartProductDetails>
                  <p>{product.name}</p>
                  <p>Items {product.quantity}</p>
                  <strong>R$ {product.price}</strong>
                  <button>Remover</button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartProductFooter>
            <Details>
              <div>
                <span>Quantidades</span>
                <p>2 itens</p>
              </div>

              <div>
                <span>Valor total</span>
                <p>R$ 100.00</p>
              </div>
            </Details>
            <button>Finalizar compra</button>
          </CartProductFooter>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
