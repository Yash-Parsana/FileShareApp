const File=require('../models/fileModel')
const senaMail=require('../services/emailService')
const emailTemplate=require('../services/emailTemplate')

const sendmail = async (req,res) => {
    
    const { uuid, emailTo, emailFrom } = req.body
    
    if (!uuid || !emailTo || !emailFrom)
    {
        res.status(422).send("All fields Are required...");
    }
    const file = await File.findOne({ uuid: uuid })
    

    if (!file)
    {
        res.status(404).send("File not found")
    }

    senaMail({
        from: emailFrom,
        to: emailTo,
        subject: "Someone want to share a file with you.",
        text: `${emailFrom} shared file with you`,
        html: emailTemplate({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`,
            size: parseInt(file.size / 1000) + 'KB',
            expires:"24 Hours"
        })
    })
    
}

module.exports=sendmail