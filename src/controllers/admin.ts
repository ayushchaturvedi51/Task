import {Request,Response} from "express"
import dbservices from "../services/dbservices"


export class userController{

  static register=async(req:Request,res:Response)=>{
    try {
      const registerUser=await dbservices.User.register(req.body)
      res.status(200).send({status:true,message:"Register Admin",data:registerUser})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static login=async(req:Request,res:Response)=>{
    try {
      const loginUser=await dbservices.User.login(req.body)
      res.status(200).send({status:true,message:"User Logged In",data:loginUser})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  
}