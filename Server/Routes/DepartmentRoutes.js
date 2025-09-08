import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"

const deptRoute = express.Router()

deptRoute.post("/signup",departmentControllers.signup)
deptRoute.post("/login",departmentControllers.login)

export default deptRoute;