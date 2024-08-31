import express from "express"
import controllers from "../controllers"
import { validateRequest } from "../validators/validateRequest"
import validators from "../validators"
import authenticateUser from "../services/authenticate"
const router=express.Router()

// GET /api/marketplace - Get a list of all available marketplace items
// ○ POST /api/marketplace - List a new item on the marketplace (used by
// distributors)
// ○ GET /api/marketplace/:id - Get details of a specific marketplace item
// ○ POST /api/marketplace/redeem/:id - Redeem an item from the

router.get('/' , controllers.market.availableItem)
router.post("/" , controllers.market.creteMarketitem)
router.get('/:id' , controllers.market.getSpecific)
// router.post


export default router