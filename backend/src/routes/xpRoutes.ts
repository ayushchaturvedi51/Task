import express from "express";
import { User } from "../services/dbservices/admin";
import { sendMail } from "../helper/sendMail";

const app = express.Router();


app.post("/awards", async (req, res) => {
  const data = req.body.data;
  const { userId, xpPoints } = data;
  try {
    // Database operation to insert awards
    const user = await User.updateUserEp(Number(userId), Number(xpPoints));
    // @ts-ignore
    const fromAchievement = await User.updateAchievements(user.id,"rewarded",xpPoints)
    // @ts-ignore
    await sendMail(user.email,`Congratulations your have received your award`,`You have received ${xpPoints} xp points in your account..!`)
    res.status(200).json({message:"Update award successfully", status:true, data:fromAchievement})
  } catch (error) {
    res.status(500).send({ message: "Error occurred while inserting awards" });
  }
});

app.post("/purchase", async (req, res) => {
  const data = req.body.data;
  const { userId, xpPoints } = data;
  try {
    // Database operation to insert purchases
    const user = await User.updateUserEp(Number(userId), Number(xpPoints));
    const admin = await User.updateAdminPoints(Number(xpPoints));
    // @ts-ignore
    const transaction = await User.createTransaction(xpPoints,"Purchases",user.id,admin.id);
    res.status(200).send({
      transaction:transaction,
      message:
        "Xp Points Created to the user Account and deducted from the admin account Purchase successful",
      status: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error occurred while inserting purchases" });
  }
});

app.post("/transfer", async (req, res) => {
  try {
    const data = req.body.data;
    const { fromUserId, toUserId, xpPoints } = data;
    // Database operation to insert transfers
    const fromUser = await User.updateUserEp(Number(fromUserId), -Number(xpPoints));
    const toUser = await User.updateUserEp(Number(toUserId), Number(xpPoints));
    // @ts-ignore
    const transaction = await User.createTransaction(xpPoints,"transfer",fromUser?.id,toUser?.id);
  
    res.status(200).send({
      message:
        "Xp Points Transferred from User to User successful",
      status: true,
    });
  } catch (error) {
    if(error.message.includes("Not Found")){
      res.status(404).send({ message: "User not found" });
      return;
    }
    res
     .status(500)
     .send({ message: "Error occurred while transferring xp points" });
  }
});


app.get("/transactions",async (req,res)=>{
  try {
    const transactions = await User.getTransactions()
    res.status(200).send({ transactions, message: "Transactions fetched successfully", status: true });
  } catch (error) {
    res.status(500).json({status:false,message:"Error while getting the transactions..!"})
  }
})

export default app

