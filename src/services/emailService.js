import nodemailer from 'nodemailer';

export class emailServices {
    #transporter;
    constructor(){
        this.#transporter = this.#createTransport();
    }
    sendMail = (to, emailTemplate, byCron = true) => {
        const subject = emailTemplate.subject || '';
        const html = emailTemplate.html || '';
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.SMTP_FROM}>`,
            to, subject, html
        };
        if(byCron){
            return true;
        }
        this.#transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return false;
            }
            return true;
        });
    }
    #createTransport = () => {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // or 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
            }
        });
    }
}