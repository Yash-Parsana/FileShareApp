const router = require('express').Router()
const {handleUpload,uuidPage,downloadFile}=require('../controller/fileController')
const sendmail=require('../controller/sendmailController')

router.post('/upload', handleUpload);
router.get('/show/:uuid', uuidPage);
router.get('/download/:uuid', downloadFile);
router.post('/sendmail', sendmail);


module.exports=router