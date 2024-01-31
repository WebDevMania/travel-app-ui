import nodemailer from "nodemailer"

export function sendEmail(email, daysDifference) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Successful booking",
        text: `You've successfully booked your hotel for ${daysDifference} nights`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error)
        } else {
            console.log("Email sent:", info.response)
        }
    })
}