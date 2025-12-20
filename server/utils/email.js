const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
const createTransporter = async () => {
    // Check if we have real credentials in env
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    return transporter;
};

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = await createTransporter();

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Grow Green" <noreply@growgreen.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw error so controller can handle it
    }
};

const sendWelcomeEmail = async (email, username) => {
    const subject = "Welcome to Grow Green!";
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h1 style="color: #166534;">Welcome to Grow Green!</h1>
            <p>Hi <strong>${username}</strong>,</p>
            <p>You have successfully signed up with this email.</p>
            <br>
            <p>Best Regards,</p>
            <p>The Grow Green Team</p>
        </div>
    `;
    return await sendEmail(email, subject, html);
};

const sendLoginNotification = async (email, username) => {
    const subject = "New Login Detected - Grow Green";
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #166534;">Login Notification</h2>
            <p>Hi <strong>${username}</strong>,</p>
            <p>You have successfully logged in to your account.</p>
            <br>
            <p>Best Regards,</p>
            <p>The Grow Green Team</p>
        </div>
    `;
    return await sendEmail(email, subject, html);
};

module.exports = {
    sendWelcomeEmail,
    sendLoginNotification
};
