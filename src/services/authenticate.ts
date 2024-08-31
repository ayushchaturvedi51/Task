import { getUser } from "../config/jwttoken"

const authenticateUser=(req,res,next)=>{

    try{
      const getToken = req.headers.authorization;
    if(!getToken){
        res.status(400).send({message:"Token not found"})
    }
    const user=getUser(getToken)
    if(!user){
        res.status(400).send({message:"User not Found"})
    }
    req.user=user
    next()
    }catch(err){
        res.status(400).send({message:err})
    }
}

export default authenticateUser