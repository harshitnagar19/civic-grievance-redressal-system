import express from "express";
import adminController from "../Controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.post("/login",adminController.login)

export default adminRoute;