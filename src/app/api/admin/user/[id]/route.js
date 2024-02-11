import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const user = await db.user.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function PUT(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params
        const body = await req.json()

        const updatedUser = await db.user.update({
            data: {
                ...body
            },
            where: {
                id
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const id = ctx.params.id

        const deletedUser = await db.user.delete({
            where: {
                id
            }
        })

        if (deletedUser) {
            return NextResponse.json({ message: "User has been deleted successfully!" }, { status: 200 })
        } else {
            return NextResponse.error({ message: "User doesn't exist" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.error(error.message)
    }
}