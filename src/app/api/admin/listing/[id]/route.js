import db from "@/lib/db"
import isAdminUser from "@/lib/isAdminUser"
import { NextResponse } from "next/server"

export async function PUT(req, ctx) {
    try {
        await isAdminUser()

        const id = ctx.params.id
        const body = await req.json()

        const updatedListing = await db.listing.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(updatedListing, { status: 200 })
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const id = ctx.params.id

        const deletedListing = await db.listing.delete({
            where: {
                id
            }
        })

        if (deletedListing) {
            return NextResponse.json({ message: "Listing has been deleted successfully!" }, { status: 200 })
        } else {
            return NextResponse.error({ message: "Listing doesn't exist" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.error(error.message)
    }
}