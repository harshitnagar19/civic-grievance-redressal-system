import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"

const deptRoute = express.Router()

deptRoute.post("/departmentSignUP",departmentControllers.signup)

export default deptRoute;