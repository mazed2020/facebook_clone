import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,     
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    DateOfBirth: {
        type: Date,
        default: null
    },
    coverPhoto: {
        type: String,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    },
    followers:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
     
    following:
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
         }
    ],
    followersCount:{
        type: Number,
        default: 0
    },
    followingCount:{
        type: Number,
        default: 0
    },
    bio:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Bio'
    }
},{timestamps:true})

const User= mongoose.model('User', userSchema);

export default User;