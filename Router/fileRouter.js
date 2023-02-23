const router = require('express').Router()
const {handleUpload,uuidPage,downloadFile}=require('../controller/fileController')

router.post('/upload', handleUpload);
router.get('/show/:uuid', uuidPage);
router.get('/download/:uuid',downloadFile)

module.exports=router