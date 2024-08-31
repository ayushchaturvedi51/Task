import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()


router.get("/profile/:id",authenticateUser,controllers.userController.getDistributorsProfile)
router.post("/profile/:id",authenticateUser,controllers.userController.updateDistributorProfile)


export default router