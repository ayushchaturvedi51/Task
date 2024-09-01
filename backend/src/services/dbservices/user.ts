import { truncate } from "fs/promises";
import postgresdb from "../../config/db"
import { setUser } from "../../config/jwttoken"
import {  admins, distributors, users } from "../../models/schema"
import { eq,and } from "drizzle-orm"

export class User{
  static generateId = () => Math.random().toString(36).substr(2, 8).toUpperCase();
  static register=async(data:any):Promise<any>=>{
    try{
      const registerUser=await postgresdb.insert(users).values({
        adminId:1,
        username:data.username,
        email:data.email,
        password:data.password,
      }).returning({email:users.email,username:users.username,role:users.role,id:users.id})
      const token = setUser({userId:registerUser[0].id})
      return {token}
      
    }catch(error){
      throw new Error(error)
    }
  }


  static login=async(details:any):Promise<any>=>{
    try{
      if (details.role=="admin"){
        const getUser=await postgresdb.query.admins.findFirst({
          where:and(eq(admins.email,details.email),eq(admins.role,details.role)),
          columns:{
            id:true,
            password:true,
            email:true,
            username:true,
            role:true
          }
        })
        if(!getUser) throw new Error("You are not authorized")
        const checkPassword=await postgresdb.select({password:admins.password}).from(admins).where(and(eq(admins.password,getUser.password),eq(admins.role,getUser.role)))
        if(!checkPassword) throw new Error("Invalid Password")
  
        const token = setUser({adminId:getUser.id})
        return {token}
      }else{
        const getUser=await postgresdb.query.users.findFirst({
          where:and(eq(users.email,details.email),eq(users.role,details.role)),
          columns:{
            id:true,
            password:true,
            email:true,
            username:true,
            role:true
          }
        })
        if(!getUser) throw new Error("You are not authorized")
        const checkPassword=await postgresdb.select({password:users.password}).from(users).where(and(eq(users.password,getUser.password),eq(users.role,getUser.role)))
        if(!checkPassword) throw new Error("Invalid Password")
  
        const token = setUser({userId:getUser.id})
        return {token}

      }
            
    }catch(error){
      throw new Error(error)
    }
  }

  static getAllusers=async(adminId:number):Promise<any>=>{
    try {
        return await postgresdb.query.admins.findFirst({
          where:eq(admins.id,adminId),
          columns:{
            username:true,
            
          },
          with:{
            users:{
              columns:{
                username:true,
                email:true,
                role:true,
                xpBalance:true,
                createdAt:true,
                updatedAt:true
              }
              

            }
          }
        })
    } catch (error) {
      throw new Error(error)
    }
  }
  
  static GetAllDistributors=async(adminId:number):Promise<any>=>{
    try {
        return await postgresdb.query.admins.findFirst({
          where:eq(admins.id,adminId),
          columns:{
            username:true, 
          },
          with:{
            distributors:{
              columns:{
                userName:true,
                organizationName:true,
                createdAt:true,
                updatedAt:true
              } 

            }
          }
        })
    } catch (error) {
      throw new Error(error)
    }
  }

  static getDistributorsProfile=async(distributorId:number):Promise<any>=>{
    try {
      return await postgresdb.query.distributors.findFirst({
        where:eq(distributors.id,distributorId),
        columns:{
          userName:true,
          organizationName:true,
          createdAt:true,
          updatedAt:true
        }
      })
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static updateDistributorProfile=async(distributorId:number,data:any):Promise<any>=>{
    try {
      const updateProfile=await postgresdb.update(distributors).set({
        userName:data.username,
        organizationName:data.organizationname
      }).where(eq(distributors.id,distributorId)).returning({userName:distributors.userName})
      if(updateProfile.length>0){
        return updateProfile
      }else{
        throw new Error("Error in Updating Profile")
      }
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static createDistributor=async(adminId:number,data:any):Promise<any>=>{
    try {
      await postgresdb.insert(distributors).values({
        adminId:adminId,
        userName:data.username,
        organizationName:data.organizationname,
        phoneNumber:data.phoneNumber
      })
      
    } catch (error) {
      throw new Error(error)
    }
  }

  static loginDistributor=async(data:any):Promise<any>=>{
    try {
      const checkDistributor=await postgresdb.query.distributors.findFirst({
        where:eq(distributors.phoneNumber,data.phoneNumber),
        columns:{
          id:true
        },
        with:{
          admins:{
            columns:{
              distributorLoginId:true,
              distributorLoginPassword:true
            }
          }
        }
      })

      if(!checkDistributor){
        throw new Error("Insert correct Credentials")
      }
      if(checkDistributor.admins["distributorLoginId"]==data.loginId && checkDistributor.admins["distributorLoginPassword"]==data.password){
        const token=setUser({distributorId:checkDistributor.id})
        return token
      }

      
    } catch (error) {
      throw new Error(error)
    }
  }

  static deleteUser=async(email:string,adminId:number):Promise<any>=>{
    try {
      await postgresdb.delete(users).where(and(eq(users.email,email),eq(users.adminId,adminId)))
      
    } catch (error) {
      throw new Error(error)
    }
  }
  
}