import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()



router.get('/' , controllers.market.availableItem)
router.post("/" , controllers.market.creteMarketitem)
router.get('/:id' , controllers.market.getSpecific)


export default router