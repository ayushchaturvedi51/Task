import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()




router.get("/", authenticateUser ,controllers.achievementsController.allachievements)
router.get('/:id' , authenticateUser ,controllers.achievementsController.specificAchievements)

export default router