import jwt from 'jsonwebtoken'
import User from '../database/Schema/User';
import { Request } from 'express';

export interface AuthRequest extends Request{
  user:string | undefined
}
export const authenticationMiddleware =async (req:AuthRequest,res,next) => {
    try {
        const {authorization} =req.headers;
        if(!authorization){
            return res.status(401).json({
                error:"Authorization is required"
            })
        }
        const token =authorization;
        const {_id} = jwt.verify(token,"express");
        const existingUser = await User.findOne({_id});
        if(existingUser){
            req.user = existingUser.id;
        }
        next();
        
    } catch (error) {
        console.log("Error in authentication Middleware",error);
    }
}