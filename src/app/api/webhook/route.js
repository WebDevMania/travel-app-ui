import { getDatesInRange } from "@/lib/dateToMilliseconds"
import { NextResponse } from "next/server"
import { sendEmail } from "./nodemailer"
import { headers } from "next/headers"
import Stripe from "stripe"
import db from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
});

export async function POST(req) {
    const sig = headers().get("stripe-signature");
    const body = await req.text()

    let event
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return NextResponse.error(error.message)
    }


    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const chargeId = paymentIntent.latest_charge

        const {
            startDate,
            endDate,
            userId,
            daysDifference,
            listingId,
            email
        } = session.metadata

        const reservedDates = getDatesInRange(startDate, endDate)

        const reservationData = {
            userId,
            listingId,
            startDate,
            endDate,
            chargeId,
            reservedDates,
            daysDifference: Number(daysDifference)
        }

        const newReservation = await db.reservation.create({
            data: reservationData
        })

        sendEmail(email, daysDifference)
        return NextResponse.json(newReservation)
    }

    return NextResponse.json({ message: "Payment has been successful" })
}