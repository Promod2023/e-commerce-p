const createError = require('http-errors');
const emailWithNodeMailer = require('./email');

const sendEmail = async (emailData) =>{
    try {
        await emailWithNodeMailer(emailData);
    } catch (emailError) {
        throw createError(500, 'failed to send varification email');
    }
};
module.exports = sendEmail;