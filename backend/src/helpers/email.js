const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");
const logger = require("../controllers/loggerController");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUserName,
      pass: smtpPassword,
    },
});
const emailWithNodeMailer = async (emailData) =>{
    try {
        const mailOptions = {
        from: smtpUserName, 
        to: emailData.email, 
        subject: emailData.subject,
        html: emailData.html,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.log('error','Message sent:%s', info.response)
    } catch (error) {
        logger.log('Error Occured while sending email:', error);  
        throw error;  
    };  
}
module.exports = emailWithNodeMailer;