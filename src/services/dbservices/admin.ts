import postgresdb from "../../config/db"
import { setUser } from "../../config/jwttoken"
import {  users } from "../../models/schema"
import { eq,and } from "drizzle-orm"

export class User{
  static generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();
  static register=async(data:any):Promise<any>=>{
    try{
      const registerUser=await postgresdb.insert(users).values({
        userId:this.generateId(),
        name:data.name,
        age:data.age,
        gender:data.gender,
        email:data.email,
        countryCode:data.countryCode,
        phoneNumber:data.phoneNumber,
        password:data.password
      }).returning({userId:users.id})
      const token = setUser({userId:registerUser[0].userId})
      return token
      
    }catch(error){
      throw new Error(error)
    }
  }

  static login=async(details:any):Promise<any>=>{
    try{
      const getUser=await postgresdb.query.users.findFirst({
        where:eq(users.email,details.email),
        columns:{
          id:true,
          password:true,
          email:true,
          phoneNumber:true
        }
      })
      if(!getUser) throw new Error("Insert Correct email")
      const checkPassword=await postgresdb.select({password:users.password}).from(users).where(and(eq(users.password,getUser.password),eq(users.phoneNumber,getUser.phoneNumber)))
      if(!checkPassword) throw new Error("Invalid Password")

      const token = setUser({userId:getUser.id})
      return token
      
    }catch(error){
      throw new Error(error)
    }
  }

  
}