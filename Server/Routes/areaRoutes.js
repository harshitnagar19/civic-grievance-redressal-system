import express from "express";
import areaController from "../Controllers/areaController.js";

const areaRoute = express.Router();

areaRoute.get("/types",areaController.getTypes)

export default areaRoute;