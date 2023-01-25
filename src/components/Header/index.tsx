import Image from "next/legacy/image";

import logoImg from "../../assets/logo.svg";
import { Cart } from "../Cart";

import { Container } from "./style";

export function Header() {
  return (
    <Container>
      <Image src={logoImg} alt="" />
      <Cart />
    </Container>
  );
}
