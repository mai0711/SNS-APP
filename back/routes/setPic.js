const express = require('express');
const router = express.Router();
const multer = require("multer")// to upload file

const storage = multer.diskStorage({
    destination: (req, file, cb) => {//destination = save location
        cb(null, "public/images"); //store posted image in "public/images"
    },
    filename: (req, file, cb)=> {  //file name
        cb(null, req.body.name ); //req.body.name = fileName in setPic.jsx
        //cb(null, file.originalname); //this is for checking in postman
    },
});

//1, API for setting profile pic
const setProfile =  multer({ storage: storage });
router.post("/profilePic", setProfile.single("file"), (req, res) => { //file = key in postman
    try{
        return res.status(200).json("Profile picture is set successfully");
    }catch(err){
        console.log(err)
    }
})

//2, API for setting cover pic
const setCover =  multer({ storage: storage });
router.post("/coverPic", setCover.single("file"), (req, res) => { //file = key in postman
    try{
        return res.status(200).json("Cover picture is set successfully");
    }catch(err){
        console.log(err)
    }
})

module.exports = router;