import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ProductDetails } from "../styles/pages/product";

import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: [];
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          {product.map((item, key) => (
            <Image key={key} src={item} width={120} height={120} alt="" />
          ))}
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{" "}
          <strong>{product.length}</strong> já está a caminho da sua casa.{" "}
        </p>

        <Link href={"/"}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

// client-side (useEffect) - precisa de tela de loading, stripe não permite por falta de segurança
// getServerSideProps
// getStaticProps - só em páginas que o usuário visita várias vezes

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // console.log - fica no nosso terminal

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  // buscar dentro do stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;

  // dessa forma eu digo que só temos um item, pois nossa plataforma não permite a compra de mais de um
  const product = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  });

  console.log(product);

  return {
    props: {
      customerName,
      product,
    },
  };
};
