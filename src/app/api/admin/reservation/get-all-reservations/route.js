import db from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "You are not an admin!" }, { status: 403 })

        const allReservations = await db.reservation.findMany({
            include: {
                listing: true,
                user: true
            }
        })

        const allReservationsTotalPrice = allReservations.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight
            }
        })

        return NextResponse.json(allReservationsTotalPrice)
    } catch (error) {
        return NextResponse.error(error)
    }
}