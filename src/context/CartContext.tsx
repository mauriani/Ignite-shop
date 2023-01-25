import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
  quantity?: number;
}

interface CartContextType {
  addItemCart: (product: IProduct, productId: String) => void;
  productsBag: IProduct[];
  totalBag: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [itemProductsBag, setItemProductsBag] = useState<IProduct[]>([]);
  const [totalCart, setTotalCart] = useState(0);

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
    const totalItem = itemProductsBag.reduce((sum, product) => {
      if (product.quantity >= 1) {
        return (sum = sum + 1);
      }
      return sum;
    }, 0);

    setTotalCart(totalItem);
  }, [itemProductsBag]);

  return (
    <CartContext.Provider
      value={{
        addItemCart,
        productsBag: itemProductsBag,
        totalBag: totalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
