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
      res.status(200).json({message:"Update award successfully", status:true, data:user})
    }catch(error){
      res.status(500).json({message:error.message,status:false})
    }
  }
    
  
}
