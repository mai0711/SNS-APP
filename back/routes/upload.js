const express = require('express');
const router = express.Router();
const multer = require("multer")// to upload file

const storage = multer.diskStorage({
    destination: (req, file, cb) => {//destination = save location
        cb(null, "public/images"); //store posted image in "public/images"
    },
    filename: (req, file, cb)=> {  //file name
        cb(null, req.body.name ); //req.body.name = fileName in Post.jsx
        //cb(null, file.originalname); //this is for checking in postman
    },
});

const upload =  multer({ storage: storage });
//upload file
router.post("/", upload.single("file"), (req, res) => { //file = key
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err)
    }
})

module.exports = router;