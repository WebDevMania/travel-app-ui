import db from '@/lib/db';
import { headers } from "next/headers";
import getCurrentUser from '@/utils/getCurrentUser';
import { NextResponse } from 'next/server';
import Stripe from 'stripe'
import { getDatesInRange } from '@/lib/dateToMilliseconds';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
});

export async function POST(req) {
    const sig = headers().get("stripe-signature");
    const body = await req.text()

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return NextResponse.error(error.message)
    }

    if (event.type === "payment_intent.succeeded") {

        const {
            startDate,
            endDate,
            userId,
            daysDifference,
            listingId,
        } = event.data.object.metadata

        const reservedDates = getDatesInRange(startDate, endDate)

        const reservationData = {
            userId,
            listingId,
            startDate,
            endDate,
            reservedDates,
            daysDifference: Number(daysDifference)
        }

        const newReservation = await db.reservation.create({
            data: reservationData
        })

        return NextResponse.json(newReservation)
    }

    return NextResponse.json({ message: "Payment has been successful" })
}