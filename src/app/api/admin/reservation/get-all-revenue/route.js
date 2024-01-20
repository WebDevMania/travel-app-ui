import db from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "You are not an admin!" }, { status: 403 })

        const allReservations = await db.reservation.findMany({
            include: {
                listing: true
            }
        })

        const allReservationsPrices = allReservations.map((reservation) => {
            return reservation.daysDifference * reservation.listing.pricePerNight
        })

        const totalRevenue = allReservationsPrices.reduce((a, b) => a + b)

        return NextResponse.json(totalRevenue)
    } catch (error) {
        return NextResponse.error(error)
    }
}