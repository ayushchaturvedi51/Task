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
      const distributorId=req["user"]["distributorId"]
      const getProfile=await dbservices.User.getDistributorsProfile(parseInt(distributorId))
      res.status(200).send({status:true,message:"Distributor Profile",data:getProfile})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static updateDistributorProfile=async(req:Request,res:Response)=>{
    try {
      const distributorId=req["user"]["distributorId"]
      const updateDistributorProfile=await dbservices.User.updateDistributorProfile(parseInt(distributorId),req.body)
      res.status(200).send({status:true,message:"Distributor Profile Updated",data:updateDistributorProfile})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static createDistributor=async(req:Request,res:Response)=>{
    try {
      const adminId=req["user"]["adminId"]
      await dbservices.User.createDistributor(parseInt(adminId),req.body)
      res.status(200).send({status:true,message:"Distributor Profile Created"})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static loginDistributor=async(req:Request,res:Response)=>{
    try {
      const loginDistributor=await dbservices.User.loginDistributor(req.body)
      res.status(200).send({status:true,message:"Distributor Login Successfully",data:loginDistributor})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }

  static deleteUser=async(req:Request,res:Response)=>{
    try {
      const email=req.params.email
      const adminId=req["user"]["adminId"]
      await dbservices.User.deleteUser(email,adminId)
      res.status(200).send({status:true,message:"Distributor deleted Successfully"})  
    } catch (error) {
      res.status(500).send({status:false,message:error.message})
    }
  }
}