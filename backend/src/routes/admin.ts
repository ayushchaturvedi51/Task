import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()


router.post("/",validateRequest(validators.Authvalidators.registerUser),controllers.userController.register)
router.post("/login",validateRequest(validators.Authvalidators.loginUser),controllers.userController.login)


export default router