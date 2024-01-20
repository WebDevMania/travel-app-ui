import db from "./db"

export const createNotification = async (userId, text) => {
    await db.notification.create({
        userId,
        text
    })
}