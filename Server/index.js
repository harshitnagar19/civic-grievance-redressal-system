import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

<<<<<<< HEAD
import route from "./Routes/userRoutes.js"
import deptRoute from "./Routes/departmentRoutes.js";
app.use("/user",route)
app.use("/department",deptRoute)
=======
import route from "./Routes/userRoutes.js";
app.use("/user", route);
>>>>>>> 8b610abdf12a566a9b69b38c82dc1f3c86ed3e60

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
});
