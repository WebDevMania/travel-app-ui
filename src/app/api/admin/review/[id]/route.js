import db from "@/lib/db"
import isAdminUser from "@/lib/isAdminUser"
import { NextResponse } from "next/server"

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params

        const review = await db.review.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: "Successfully deleted the review" })
    } catch (error) {
        return NextResponse.error(error.message)
    }
}