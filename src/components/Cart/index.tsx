import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Bag, Minus, Plus } from "phosphor-react";
import axios from "axios";

import { CartContext } from "../../context/CartContext";

import { CartButton } from "../CartButton";

import {
  CartContent,
  CartClose,
  CartProduct,
  EmptyBag,
  CartProductImage,
  CartProductDetails,
  CartProductFooter,
  Details,
} from "./styles";

export function Cart() {
  const { productsBag, decrementItemCart, totalPayable, addItemCart } =
    useContext(CartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyproduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: productsBag,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log(err);
      setIsCreatingCheckoutSession(false);
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      alert("Falha ao redirecionar ao checkout");
    }
  }

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
            {productsBag.length >= 1 ? (
              productsBag.map((product) => (
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
                    {/* <p>{product.quantity} Items </p> */}
                    <strong>{product.price}</strong>

                    <div>
                      <button onClick={() => addItemCart(product, product.id)}>
                        <Plus size={20} />
                      </button>

                      <input type="number" readOnly value={product.quantity} />
                      <button onClick={() => decrementItemCart(product.id)}>
                        <Minus size={20} />
                      </button>
                    </div>
                  </CartProductDetails>
                </CartProduct>
              ))
            ) : (
              <EmptyBag>
                <p>Parece que o seu carrinho está vazio!</p>
                <Bag size={32} />
              </EmptyBag>
            )}
          </section>

          {productsBag.length >= 1 && (
            <CartProductFooter>
              <Details>
                <div>
                  <span>Valor total</span>
                  <p>{totalPayable}</p>
                </div>
              </Details>
              <button
                disabled={isCreatingCheckoutSession}
                onClick={handleBuyproduct}
              >
                Finalizar compra
              </button>
            </CartProductFooter>
          )}
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
