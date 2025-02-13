
import { verfyUserToken } from "../utils/jsonwebtoken.js";
const authMiddleware=async(req,res,next)=>{
    try {
        const token=req?.cookies?.token;
        // console.log(token)
        const user=await verfyUserToken(token);
        req.user=user;
        next();

    } catch (error) {
        res.json({
            message:error.message
        })
        
    }


}

export default authMiddleware;