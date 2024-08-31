import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()


// router.post("/register",validateRequest(validators.Authvalidators.registerUser),controllers.userController.register)
// router.post("/login",validateRequest(validators.Authvalidators.loginUser),controllers.userController.login)
router.get("/users",authenticateUser,controllers.userController.getAllusers)
router.get("/distributors",authenticateUser,controllers.userController.getAllDistributors)


export default router