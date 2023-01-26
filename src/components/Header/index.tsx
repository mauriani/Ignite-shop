import Image from "next/legacy/image";
import Link from "next/link";
import logoImg from "../../assets/logo.svg";
import { Cart } from "../Cart";

import { Container } from "./style";

export function Header() {
  return (
    <Container>
      <Link href={"/"}>
        <Image src={logoImg} alt="" />
      </Link>

      <Cart />
    </Container>
  );
}
