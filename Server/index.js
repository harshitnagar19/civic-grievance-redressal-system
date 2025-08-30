import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import bodyParser from "body-parser"
const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


import route from "./Routes/userRoutes.js"
app.use("/user",route)

const PORT  = process.env.PORT
connectDB().then(
    ()=>{
        app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`)
        })
    }
)
