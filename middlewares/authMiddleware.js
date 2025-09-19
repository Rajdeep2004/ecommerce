import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protect the user using token 

export const requireSignIn=async (req,res,next) => { 
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch (error) {
        console.log(error);
    }
};

//admin access middleware
export const isAdmin= async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user._id);
        if(user.role!== 1){
            return res.status(401).send({
                success:false,
                message:'unauthotrized access'
            });
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success:false,
            message:"Invalid admin",
            error
        });
        
    }
};