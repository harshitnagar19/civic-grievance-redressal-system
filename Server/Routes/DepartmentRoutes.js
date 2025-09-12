import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"
import { verifyDepartmentToken } from "../middleware/verifyDeptToken.js"

const deptroute  = express.Router()

deptroute.post("/signup",departmentControllers.signup)
deptroute.post("/login",departmentControllers.login)
deptroute.post("/refresh",verifyDepartmentToken,departmentControllers.refresh)


export default deptroute ;
