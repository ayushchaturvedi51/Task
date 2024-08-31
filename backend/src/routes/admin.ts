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
<<<<<<< HEAD
=======
router.post("/distributor",authenticateUser,controllers.userController.createDistributor)

>>>>>>> 45376f96ba7031686c4098d3d6f722f3a36d5bca


export default router