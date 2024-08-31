import {Request,Response} from "express"
import dbservices from "../services/dbservices"


export class userController{

  static register=async(req:Request,res:Response)=>{
    try {
      const registerUser=await dbservices.User.register(req.body)
      res.status(200).send({status:true,message:"Register User",data:registerUser})  
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

  static getAllusers=async(req:Request,res:Response)=>{
    try {
      const adminId=req["user"]["adminId"]
      const GetAllUsers=await dbservices.User.getAllusers(adminId)
      res.status(200).send({status:true,message:"All data Of users",data:GetAllUsers})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }
  
  static getAllDistributors=async(req:Request,res:Response)=>{
    try {
      const adminId=req["user"]["adminId"]
      const GetAllDistributors=await dbservices.User.GetAllDistributors(adminId)
      res.status(200).send({status:true,message:"All data Of Distributors",data:GetAllDistributors})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static getDistributorsProfile=async(req:Request,res:Response)=>{
    try {
      const distributorId=req.params.id 
      const getProfile=await dbservices.User.getDistributorsProfile(parseInt(distributorId))
      res.status(200).send({status:true,message:"Distributor Profile",data:getProfile})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static updateDistributorProfile=async(req:Request,res:Response)=>{
    try {
      const distributorId=req.params.id 
      const updateDistributorProfile=await dbservices.User.updateDistributorProfile(parseInt(distributorId),req.body)
      res.status(200).send({status:true,message:"Distributor Profile Updated",data:updateDistributorProfile})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }
}