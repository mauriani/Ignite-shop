import React, { createContext, ReactNode, useEffect, useState } from "react";

import { formatPrice } from "../utils/format";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
  quantity?: number;
  priceUnitAmount: number;
}

interface CartContextType {
  addItemCart: (product: IProduct, productId: String) => void;
  decrementItemCart: (productId: String) => void;
  productsBag: IProduct[];
  totalBagItems: number;
  totalPayable: String;
  isCreatingCheckout: boolean;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [itemProductsBag, setItemProductsBag] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalPayable, setTotalPayable] = useState("");

  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  function addItemCart(product: IProduct, productId: String) {
    try {
      setIsCreatingCheckout(true);
      // Verifica se o item existe
      const isExisting = itemProductsBag.some(
        (product) => product.id === productId
      );

      // se não existir adiciona
      if (!isExisting) {
        setItemProductsBag((state) => [...state, product]);
      }
      // se existir altera a quantidade
      else {
        const newItem = itemProductsBag.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return {
              ...product,
            };
          }
        });

        setItemProductsBag(newItem);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  function decrementItemCart(productId: String) {
    itemProductsBag.map((product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          console.log(product.quantity);
          removeItem(productId);
        } else {
          const newItem = {
            ...product,
            quantity: product.quantity - 1,
          };

          setItemProductsBag([newItem]);
        }
      }
    });
  }

  function removeItem(productId: String) {
    setItemProductsBag((state) =>
      state.filter((item) => item.id !== productId)
    );
  }

  useEffect(() => {
    // número de itens adicionados a sacola
    const totalItem = itemProductsBag.reduce((sum, product) => {
      if (product.quantity >= 1) {
        return (sum = sum + 1);
      }
      return sum;
    }, 0);

    // total a pagar
    const totalPay: number = itemProductsBag
      .filter((product) => product.quantity >= 1)
      .map((product) => {
        if (product.quantity > 0)
          return product.quantity * product.priceUnitAmount;
        else return 0;
      })
      .reduce((total, currentValue) => total + currentValue, 0);

    setTotalCart(totalItem);
    setTotalPayable(formatPrice(totalPay));
  }, [itemProductsBag]);

  return (
    <CartContext.Provider
      value={{
        addItemCart,
        decrementItemCart,
        productsBag: itemProductsBag,
        totalBagItems: totalCart,
        totalPayable: totalPayable,
        isCreatingCheckout: isCreatingCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
