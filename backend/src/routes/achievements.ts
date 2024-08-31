import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()




router.get("/",controllers.achievementsController.allachievements)
router.post("/",controllers.achievementsController.creteAchievement)
router.get('/:id' , controllers.achievementsController.specificAchievements)

export default router