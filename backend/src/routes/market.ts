import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()



router.get('/' , controllers.market.availableItem)
router.post("/" , authenticateUser,controllers.market.creteMarketitem)
router.get('/:id' ,authenticateUser, controllers.market.getSpecific)
router.post('/:id' , authenticateUser, controllers.market.redeemedItem)


export default router