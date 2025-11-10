import express from "express";
import complainController from "../Controllers/complainControllers.js";

import { verifyToken } from "../middleware/verifyToken.js";
const complainRoute = express.Router();

// get
complainRoute.get("/get-all-complain",verifyToken,complainController.getAllComplain);
complainRoute.get("/get-complain-by-department",verifyToken,complainController.getComplainByDepartment);


// post
complainRoute.post("/add",verifyToken,complainController.add);

export default complainRoute;