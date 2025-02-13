import jwt from "jsonwebtoken"

 export  const generateAuthToken=async(user)=>{
    const {email,userName}=user;
    const payload={
        email,
        userName
    }
    return jwt.sign(payload,process.env.JWT_SECRETE,{expiresIn:process.env.EXPIRE_TOKEN});
}

export const verfyUserToken=async(token)=>{
    return jwt.verify(token,process.env.JWT_SECRETE)
}