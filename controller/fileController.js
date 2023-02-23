const multer = require('multer')
const path=require('path')
const File=require('../models/fileModel')
const {v4:uuid4}=require('uuid')


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`
        cb(null,uniqueName) //(err,name)
    }
})

let upload = multer({
    storage: storage,
    limit:{fileSize:1000000*100}
}).single('myfile')

const handleUpload = (req,res) => {
    
    
    
    //store File
    upload(req, res, async (err) => {
        //validate
        if (!req.file)
        {
            res.json({
                success: false,
                message:"File is not provided"
            })
        }
        if (err)
        {
            return req.status(500).send({error:err.message})
        }
        //store in database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size:req.file.size
        })
        const response = await file.save()
        return res.json({
            file:`${process.env.APP_BASE_URL}/api/files/show/${response.uuid}`
        })
    })
}


const uuidPage = async (req,res) => {

    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        
        if (!file)
        {
            res.render('download',{error:"Linke has been Expired..."})
        }
        else {
            
            // res.render("index");
            res.render("download", {
                downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`,
                fileName: `${file.filename}`,
                fileSize: file.size,
                
            })
        }
        // res.status(200).json({
        //     link:`${process.env.APP_BASE_URL}/api/files/download/${file.uuid}`
        // })
    } catch (error) {
        console.log("Error in uuidPageMethod : ",error);
        res.send({Error:error})
    }

}
const downloadFile = async (req, res) => {
    
    
    try {
        
        const file = await File.findOne({ uuid: req.params.uuid })
        
        if (!file)
        {
            res.json({
                message:"File not Found..."
            })
        }
        console.log(file);
        const filepath = `${__dirname}/../${file.path}`;
        console.log("File path : ",filepath);
        res.download(filepath)

    } catch (error) {
        console.log("Error in download method: ",error);
    }

}

module.exports={handleUpload,uuidPage,downloadFile}