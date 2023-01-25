import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "phosphor-react";
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

            <CartProduct>
              <CartProductImage>
                <Image
                  src={
                    "https://s3-alpha-sig.figma.com/img/387d/13ce/de131bd1ccf9bbe6b2331e88d3df20cd?Expires=1675641600&Signature=F8zURRpbXH3uFXbsuciTmQzCQ~5GvCbpp1C--h~T0WSmRJ6BBipzZKYheTYD99x2jFFbg6~8dNe74aSsUc6wWzk94IjzpZBoktljs7KBIrAvfZkHBNELQawKYtG3OVC57ruxj05Kg1Coxlu~wuMnM7WMPYl3WZJaZN0Tf12ARpuYZWpzH5BlHfhg20W3U0iNCypyFGlfI~YAMFGer5HVUSCo5uJWUwSGfPUSBn3YNkMoQQBGWKts9hJVPw8eT50yRhJmFZ6KatY2N7NpkgceobB8rz-AvsVqRS3~xh96VZH~gqBBwIKLBQJvNBOJMDvVyHqevGp~Cf2Is97smQST-A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  }
                  width={100}
                  height={93}
                  alt=""
                />
              </CartProductImage>

              <CartProductDetails>
                <p>Camiseta Beyond the Limits</p>
                <strong>R$ 79,90</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
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
