import areaControllers from "../Controllers/areaControllers.js";

import express from "express";
const areaRoute = express.Router();

areaRoute.get("/get-area-by-state-and-district",areaControllers.getAreaByStateAndDistrict)

export default areaRoute;