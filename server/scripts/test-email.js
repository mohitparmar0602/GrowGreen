require('dotenv').config();
const { sendWelcomeEmail } = require('../utils/email');

async function test() {
    console.log('Testing Welcome Email...');
    try {
        const info = await sendWelcomeEmail('test_verification@example.com', 'VerificationUser');
        console.log('Test Complete.');
        if (info && info.messageId) {
            console.log('SUCCESS: Email sent successfully.');
        } else {
            console.log('FAILURE: No message ID returned.');
        }
    } catch (error) {
        console.error('FAILURE: Error sending email:', error);
    }
}

test();
