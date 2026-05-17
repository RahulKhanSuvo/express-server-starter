import Stripe from "stripe";
import envConfig from "./env";

export const stripe = new Stripe(envConfig.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
});
