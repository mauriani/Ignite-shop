import { useContext, MouseEvent } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react";
import { ShoppingBag } from "phosphor-react";

import "keen-slider/keen-slider.min.css";
import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import { CartContext, IProduct } from "../context/CartContext";

import Stripe from "stripe";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const { addItemCart } = useContext(CartContext);

  function handleAddCart(product: IProduct, productId: string) {
    addItemCart(product, productId);
  }

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 1.2,
          spacing: 24,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 2.5,
          spacing: 48,
        },
      },
    },
  });

  // prefetch - só funciona quando passar o hover
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className={"keen-slider"}>
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`product/${product.id}`} prefetch={false}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt=""
                  layout="responsive"
                />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button onClick={() => handleAddCart(product, product.id)}>
                  <ShoppingBag size={25} />
                </button>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: 1,
      priceUnitAmount: price.unit_amount ? price.unit_amount / 100 : 0,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 1, // 1 hour no cache
  };
};
