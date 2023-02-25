const nodemailer = require('nodemailer')

const sendMail = async ({from,to,subject,text,html }) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const info = await transporter.sendMail({
        from: `fileShare<${from}>`,
        to: to,
        sublect: subject,
        text: text,
        html:html
    })

}

module.exports=sendMail