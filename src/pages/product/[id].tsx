import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>

        <span>R$ 79.90</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sed, natus quam cupiditate dolore voluptatibus officiis voluptate,
          vero inventore explicabo eligendi deleniti velit a, eos recusandae
          reiciendis labore est iure!
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
