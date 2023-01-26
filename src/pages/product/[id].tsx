import { useContext, useState } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";

import { CartContext, IProduct } from "../../context/CartContext";
import { stripe } from "../../lib/stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    numberPrice: number;
    description: string;
    defaultPriceId: string;
    quantity?: number;
    priceUnitAmount: number;
  };
}

export default function Product({ products }: ProductProps) {
  const { addItemCart, isCreatingCheckout } = useContext(CartContext);

  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{products.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={products.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{products.name}</h1>

          <span>{products.price}</span>
          <p>{products.description}</p>

          <button
            disabled={isCreatingCheckout}
            onClick={() => addItemCart(products, products.id)}
          >
            Adicionar carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados
  return {
    paths: [{ params: { id: "prod_Mu1qBLAdJFbVzu" } }],

    // quando passa false (quando tenta acessar um produto fora do path ele dá 404)
    // com true - quando acessar um produto fora do path, o next tenta executar toda a logica (sem informação do produto)
    fallback: true,
  };
};

/** CARREGAMENTO DOS DADOS DO PRODUTO */
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  /** default_price: PREÇO PADRÃO */
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      products: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        quantity: 0,
        priceUnitAmount: price.unit_amount ? price.unit_amount / 100 : 0,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour no cache
  };
};
