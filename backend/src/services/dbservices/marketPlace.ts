import { promises } from "dns"
import postgresdb from "../../config/db"
import { setUser } from "../../config/jwttoken"
import { users ,achievements,marketplaceItems} from "../../models/schema"
import { eq,and } from "drizzle-orm"

export class market{
      
    static getAvailableItems =async():Promise<any>=>{
        try{
            const available = await postgresdb.query.marketplaceItems.findMany({
                columns:{
                    id:true,
                    name:true,
                    description:true,
                    xpPrice:true
                }
            })
        }catch(error){
            throw new Error
        }
    }

    static getspecific =async(marketplaceItemsId:string):Promise<any>=>{
        try{
            const specific = await postgresdb.query.marketplaceItems.findFirst({
                where: (marketplaceItems, { eq }) => eq(marketplaceItems.id ,parseInt(marketplaceItemsId)),
                columns:{
                    id:true,
                    name:true,
                    description:true,
                    xpPrice:true
                }
            })
            return specific ;
        }catch(error){
            throw new Error
        }

    }

    static createMarketitem = async(market:any): Promise<any>=>{
        try{
            const create = await postgresdb.insert(marketplaceItems).values({
                name:market.name,
                description:market.description,
                distributorId:market.distributorId,
                xpPrice:market.xpPrice
 
            })
            return create
        }catch(error){
            throw new Error
        }
    }
}
