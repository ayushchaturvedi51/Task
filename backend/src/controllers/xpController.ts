import { Request, Response } from "express";
import dbservices from "../services/dbservices";
import { sendMail } from "../helper/sendMail";

export class xpController {

  static reward = async (req:Request,res:Response)=>{
    try{
      const disId = req["user"]["distributorId"]
      const { userId, xpPoints } = req.body;
      const user = await dbservices.Admin.userAchievement(disId,Number(userId), Number(xpPoints));
      await sendMail(user[0].email,`Congratulations your have received your award`,`You have received ${xpPoints} xp points in your account..!`)
      res.status(200).send({message:"Update award successfully", status:true, data:user})
    }catch(error){
      res.status(500).send({message:error.message,status:false})
    }
  }

  static buyXP= async (req:Request,res:Response)=>{
    try{
      const userId = req["user"]["userId"]
      const xpBalance = req.body.XP
      const adminId = req.body.adminId
      const buyXP = await dbservices.User.buyXP(userId, parseInt(xpBalance),adminId);
      res.status(200).send({message:"XP Points Buyed Successfully", status:true, data:buyXP})
    }catch(error){
      res.status(500).send({message:error.message,status:false})
    }
  }

  static transferXp = async(req:Request,res:Response)=>{
    try{
      const fromUserId = req['user']["userId"]
      const xpBalance = req.body.xpBalance
      const toUserId = req.body.toUser
      await dbservices.User.transferXp(fromUserId,xpBalance,toUserId)
      res.status(200).send({message:"XP Points Transfered Successfully", status:true})

    }catch(error){
      res.status(500).send({message:error.message,status:false})
    }
  }
    
  static getTransactionHistory=async(req:Request,res:Response)=>{
    try{
      const userId = req['user']["userId"]
      const allTransactions=await dbservices.User.getTransactionHistory(userId)
      res.status(200).send({message:"All Transactions", status:true,data:allTransactions})
    }catch(error){
      res.status(500).send({message:error.message,status:false})
    }
  }
  
}
