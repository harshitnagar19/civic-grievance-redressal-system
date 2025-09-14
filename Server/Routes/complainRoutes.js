import express from "express";
import complainController from "../Controllers/complainControllers.js";

const complainRoute = express.Router();


complainRoute.post("/add",complainController.add);

export default complainRoute;