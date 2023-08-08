const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const PORT = 8000

require("dotenv").config()

//画像のある場所までいくパス
app.use("/images", express.static(path.join(__dirname, "public/images"))); //"/imagesの時public/imagesに行く"

//middleware
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection is Successful");
}).catch((error)=>{
    console.log(error)
});


app.listen(PORT, () => {console.log("Server is running");});