import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

export const createPost=async(req,res)=>{
    try {
        const {email}=req.user;
    if(!email){
        res.status(402).json({
            message:"you have to login first"
        })
    }
    const user=await User.findOne({email});
    // console.log(user);
    if(!user){
        res.status(402).json({
            message:"user not register yet ",
        })
    }
    const userId=user?._id;
    const{content}=req.body;
    let mediaURL=null;
    let mediaType=null;

     const file=req.file
      
    if(file){
        // console.log(file.path)
        const uploadResult= await uploadFileToCloudinary(file);
        // console.log(uploadResult);
        mediaURL=uploadResult?.secure_url;
        mediaType=file.mimetype.startsWith('video')?'video':'image'
    }
    const newPost=new Post({
        userId,
        mediaURL,
        mediaType,
        content,
        likeCount:0,
        commentCount:0,
        shareCount:0

    })
     await newPost.save();
   
    return res.status(201).json({
        message:"successfull",
        data:newPost
    })

        
    } catch (error) {
        res.status(402).json({
            message:error.message
        }
        )
    }
    
    


    
}