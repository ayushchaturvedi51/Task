import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()


<<<<<<< HEAD
=======
router.post("/",controllers.userController.loginDistributor)
>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca
router.get("/profile/:id",authenticateUser,controllers.userController.getDistributorsProfile)
router.post("/profile/:id",authenticateUser,controllers.userController.updateDistributorProfile)


export default router