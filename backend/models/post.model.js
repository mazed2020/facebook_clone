import mongoose  from "mongoose";

const postScema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
    },
    mediaURL:{
        type:String,
        default:''
    },
    mediaType:{
        type:String,
         enum:['video','image']
    },
     likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comment:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        content:{
            type:String,
            require:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
         
    }],
    share:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    commentCount:{
        type:Number,
        default:0
    },
    likeCount:{
        type:Number,
        default:0
    },
    shareCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Post=mongoose.model('Post',postScema);

export default Post;