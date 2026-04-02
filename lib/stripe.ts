import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export const PLANS = {
  starter: {
    name: 'Starter',
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    amount: 299,
    label: '$2.99/month',
  },
  pro: {
    name: 'Professional',
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    amount: 799,
    label: '$7.99/month',
  },
} as const

export type PlanKey = keyof typeof PLANS
