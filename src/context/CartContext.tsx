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
  productsBag: IProduct[];
  totalBagItems: number;
  totalPayable: String;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [itemProductsBag, setItemProductsBag] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalPayable, setTotalPayable] = useState("");

  function addItemCart(product: IProduct, productId: String) {
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
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      });

      setItemProductsBag(newItem);
    }
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

    const totalPayFormat = formatPrice(totalPay);

    setTotalCart(totalItem);
    setTotalPayable(totalPayFormat);
  }, [itemProductsBag]);

  return (
    <CartContext.Provider
      value={{
        addItemCart,
        productsBag: itemProductsBag,
        totalBagItems: totalCart,
        totalPayable: totalPayable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
