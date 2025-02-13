import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import { CLOUD_NAME,API_KEY,SECRETE_kEY } from "../config/config.js";
cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key: API_KEY,
    api_secret:SECRETE_kEY
});

export const uploadFileToCloudinary=async (file)=>{
    const option={
        resource_type: file.mimetype.startsWith('video')?'video':'image'
    }

    return new Promise((resolve,reject) => {

        if(file.mimetype.startsWith('video')){
            cloudinary.uploader.upload_large(file.path,option,(error,result)=>{
                if(error){
                   return reject(error);
                }else{
                 resolve(result);
                }
            })

        }else{
            cloudinary.uploader.upload(file.path,option,(error,result)=>{
                if(error){
                    return reject(error)
                }else{
                    resolve(result)
                }
            })
            
        }

    })

}

export const multerMiddleware=multer({dest:"../uploads"})
