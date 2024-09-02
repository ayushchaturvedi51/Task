import { promises } from "dns"
import postgresdb from "../../config/db"
import { setUser } from "../../config/jwttoken"
import { users ,achievements,marketplaceItems} from "../../models/schema"
import { eq } from "drizzle-orm"

export class market{
      
    static getAvailableItems =async():Promise<any>=>{
        try{
            const availableitems = await postgresdb.query.marketplaceItems.findMany({
                columns:{
                    id:true,
                    name:true,
                    description:true,
                    xpPrice:true,
                    isReedemed:true
                }
            })
            return availableitems;
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

    static createMarketitem = async(market:any ,id:number): Promise<any>=>{
        try{
            console.log("createMarketitem");
            console.log(market)
            
            const create = await postgresdb.insert(marketplaceItems).values({
                name:market.name,
                description:market.description,
                xpPrice:market.xpPrice,
                distributorId:id
            }).returning({
                name:marketplaceItems.name,
                description:marketplaceItems.description,
                xpPrice:marketplaceItems.xpPrice,
                distributorId:marketplaceItems.distributorId,
            })
            return create
        }catch(error){
            throw new Error(error)
        }
    }


    static redeemItem = async(marketplaceItemId:number,userId:number): Promise<any>=>{
        try{
            const update =await postgresdb.update(marketplaceItems).set({
                isRedeemed:true,
                userId:userId
            }).where(eq(marketplaceItems.id , marketplaceItemId)).returning({
                name:marketplaceItems.name
            })
        }catch(error){
            throw new Error
        }
    }
}
