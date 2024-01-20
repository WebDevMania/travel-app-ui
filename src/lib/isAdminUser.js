import getCurrentUser from "@/utils/getCurrentUser"
import { NextResponse } from "next/server"

export default isAdminUser = async () => {
    try {
        const currentUser = await getCurrentUser()
        if (currentUser?.isAdmin) return NextResponse.error({ message: "You are not an admin", status: 403 })
    } catch (error) {
        return NextResponse.error(error.message)
    }
} 