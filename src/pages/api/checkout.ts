import { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../context/CartContext";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body as { products: IProduct[] };

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!products) {
    return res.status(400).json({ error: "Price not found." });
  }

  /** URL DE REDIRECIONAMENTO QUANDO O USUÁRIO ESTÁ CANCELANDO OU FINALIZANDO A COMPRA NO STRIPE */

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    /* Mode: só coloca as credenciais do cartão e finaliza*/
    mode: "payment",
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: product.quantity,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
