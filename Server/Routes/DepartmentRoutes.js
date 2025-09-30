import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"
import { verifyDepartmentToken } from "../middleware/verifyDeptToken.js"

const deptroute  = express.Router()

deptroute.post("/signup",departmentControllers.signup)
deptroute.post("/login",departmentControllers.login)
deptroute.post("/refresh",verifyDepartmentToken,departmentControllers.refresh)
deptroute.get("/get-all-state-of-department",departmentControllers.getAllState)
deptroute.get("/get-all-districts-of-state",departmentControllers.getAllDistrictsOfState)
deptroute.get("/get-all-department-of-district",departmentControllers.getAllDepartmentOfDistrict)

deptroute.get("/get-department-info",departmentControllers.getDepartmenInfo)

export default deptroute ;
