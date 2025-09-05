import express from "express"

const route = express.Router()

import userControllers from "../Controllers/userControllers.js"
route.post("/signup",userControllers.signup)
route.post("/login",userControllers.login)

export default route; 
