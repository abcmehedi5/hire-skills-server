const path = require('path');
const fs = require('fs');
const {Router} = require('express');
const multer = require('multer');
const { API } = require('../util/constant');
const uploadFilesRouter = Router();

const UPLOADED_DESTINATION = "public/uploaded";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, UPLOADED_DESTINATION)
    },
    filename: (req, file, cb)=>{
        if(!fs.existsSync(UPLOADED_DESTINATION)){
            fs.mkdirSync("./public");
            fs.mkdirSync("./public/uploaded");
        }
        const ext = path.extname(file.originalname);
        const fileName = file.originalname.replace(ext, "")
                                .split(" ")
                                .join("-")+ Date.now()+ext;
        cb(null, fileName);
    }
    
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb)=>{
        if(file.mimetype==="image/jpg" || 
            file.mimetype==="image/png" || 
            file.mimetype ==="image/jpeg"){
            cb(null, true);
        }else{
            cb(new Error("The image must be jpg or png or jpeg"));
        }
    }
});

uploadFilesRouter.post(API.API_CONTEXT+"upload/image", upload.single("image"), (req,res)=>{
    const path = req.file.destination.replace("public/", "/") +"/"+ req.file.filename
    res.json({
        message: "Successfully uploaded",
        path: path
    });
})

module.exports = uploadFilesRouter;