import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import apiResponse from '../utils/apiResponse.js';
import { generateAuthToken} from '../utils/jsonwebtoken.js'


export const userRegistration=async(req,res)=>{
    try{
        const {userName,password,email}=req.body;
        if(!userName ||!password ||!email){
            return res.status(400).json({error:"Username and password are required"});
        }
        //Check if the email already exists in the database
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }
        //Hash the password before saving it to the database
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User(
            {
                userName,
                password:hashedPassword,
                email:email,
                DateOfBirth: req?.body?.DateOfBirth,




            });
        const savedUser=await newUser.save();
        res.status(201).json({message:"User registered successfully",user:savedUser});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}



export const login =async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email ||!password) {
            return res.status(400).json(new apiResponse(401,"email and password require"));
        }
        const user = await User.findOne({ email });
        const{userName}=user;
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        // Generate JWT token 
        const token =  await generateAuthToken(user);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true
        });
        res.json({ message: 'User logged in successfully',user:{
           email,
           userName


        },token });
    }catch(error){
        res.status(400).json({ error: error.message });
    }

}

export const logOut=async (req,res)=>{
  try{
     const token=req.cookies.token;
    //  console.log(token);
      res.clearCookie("token");
    res.json({
        message:"user sucessfull logout",
        "Token":token
    })

  }catch(error){
    res.json({
        message:error.message
    })
  }



    }

 