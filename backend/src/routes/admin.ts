import express from "express"
import controllers from "../controllers"
import authenticateUser from "../services/authenticate"
const router=express.Router()


// router.post("/register",validateRequest(validators.Authvalidators.registerUser),controllers.userController.register)
// router.post("/login",validateRequest(validators.Authvalidators.loginUser),controllers.userController.login)
router.get("/users",authenticateUser,controllers.userController.getAllusers)
router.get("/distributors",authenticateUser,controllers.userController.getAllDistributors)
router.post("/distributor",authenticateUser,controllers.userController.createDistributor)
router.delete("/:email",authenticateUser,controllers.userController.deleteUser)


export default router