import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(req) {

  const {
    listing: { name, pricePerNight, id: listingId },
    startDate,
    endDate,
    daysDifference
  } = await req.json()

  const stripe_obj = [{
    price_data: {
      currency: 'usd',
      product_data: {
        name
      },
      unit_amount: pricePerNight * 100
    },
    quantity: daysDifference
  }]

  try {
    const currentUser = await getCurrentUser()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripe_obj,
      mode: "payment",
      success_url: 'http://localhost:3000/success-page',
      cancel_url: 'http://localhost:3000',
      payment_intent_data: {
        metadata: {
          startDate,
          endDate,
          listingId,
          pricePerNight,
          daysDifference,
          userId: currentUser.id
        }
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}