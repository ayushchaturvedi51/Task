import {Request,Response} from "express"
import dbservices from "../services/dbservices"
import postgresdb from "../config/db"


export class market{

    static availableItem = async(req: Request, res: Response): Promise<any>=>{
        try {
            const availableItems = await dbservices.market.getAvailableItems()
            if(!availableItems){
                res.status(404).send({status:false, message:"No available items found"})
            }
            res.status(200).send({status:true, message:"Available Items", data:availableItems})
        } catch (error) {
            res.status(500).send({status:false, message:error.message})
        }
    }

    static getSpecific = async(req: Request, res: Response): Promise<any> => {
        try{
           const marketItemId = req.params.id
           const data = await dbservices.market.getspecific(marketItemId)
           if(!data){
                res.status(404).send({status:false, message:"No item found"})
           }
           res.status(200).send({status:true, message:"Item Found", data})
        }catch(error) {
            res.status(500).send({status:false, message:error.message})
        }
    }

    static creteMarketitem = async(req: Request, res: Response): Promise<any>=>{
        try{
            const marketItem = req.body
            const createdItem = await dbservices.market.createMarketitem(marketItem)
            res.status(200).send({status:true, message:"Item Created", data:createdItem})
        }catch(error) {
            res.status(500).send({status:false, message:error.message})
        }
    }
}