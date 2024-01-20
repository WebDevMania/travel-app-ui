import db from "@/lib/db"
import getCurrentUser from "@/utils/getCurrentUser"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "You are not an admin!" }, { status: 403 })

        const allListings = await db.listing.findMany({
            include: {
                reservations: true
            }
        })

        const mostReservedListing = allListings.reduce((a, b) => {
            return a?.reservations?.length >= b?.reservations?.length
                ? a
                : b
        })

        return NextResponse.json(mostReservedListing)
    } catch (error) {
        return NextResponse.error(error)
    }
}