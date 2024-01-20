import db from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "You are not an admin!" }, { status: 403 })

        const allReservations = await db.reservation.findMany({})

        return NextResponse.json(allReservations)
    } catch (error) {
        return NextResponse.error(error)
    }
}