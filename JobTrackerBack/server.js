require("dotenv").config();
const express = require("express");
const cors =require("cors")
const apirouter=require("./Roter/Route")
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api" , apirouter )


const port = process.env.PORT
app.listen(port , ()=>{
    console.log(`server listen to ${port}`)
})