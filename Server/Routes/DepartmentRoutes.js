import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"
import { verifyToken } from "../middleware/verifyToken.js"

const deptroute  = express.Router()

deptroute.post("/signup",departmentControllers.signup)
deptroute.post("/login",departmentControllers.login)


export default deptroute ;
