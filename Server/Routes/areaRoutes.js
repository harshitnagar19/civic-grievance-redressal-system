import areaControllers from "../Controllers/areaControllers.js";

import express from "express";
const areaRoute = express.Router();

areaRoute.get("/get-area-by-state-and-district",areaControllers.getAreaByStateAndDistrict)

import areaController from "../Controllers/areaController.js";

areaRoute.get("/types",areaController.getTypes)

export default areaRoute;