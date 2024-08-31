import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret=process.env.SECRET_KEY;



const setUser=(payload )=>{
  const {adminId,userId,distributorId}=payload
  
  return jwt.sign({
    userId:userId || undefined,
    adminId:adminId || undefined,
    distributorId:distributorId || undefined
  },secret,{
    expiresIn:'24h'
  })

}

const getUser=(token)=>{
  let newtoken=token.slice(7,)
  return jwt.verify(newtoken,secret)
}

export {setUser,getUser}