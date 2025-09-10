import express from "express"
import departmentControllers from "../Controllers/departmentControllers.js"

const route  = express.Router()

route .post("/signup",departmentControllers.signup)
route .post("/login",departmentControllers.login)

export default route ;
