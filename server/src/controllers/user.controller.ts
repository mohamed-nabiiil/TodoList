import { types } from 'util';
import User from '../database/Schema/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Types } from 'mongoose';
import { IUser } from '../types';


const getUserToken = (_id:string|Types.ObjectId)=>{
    const authenticatedUserToken= jwt.sign({_id},"express",{expiresIn:"7d"});
    return authenticatedUserToken; 
}

export const CreateUser=async (req,res) => {
try {
    const {name,email,password} = req.body;
     
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).send("User already exist")
    }

    const hashedPassword = await bcrypt.hash(password,12);

    const newUser = await User.create({
        name,
        email,
       password:hashedPassword,
    });
    return res.status(201).send({message: "User Created Successfully!"});
} catch (error) {
 console.log(error);   
}

}

export const LoginUser =async (req,res)=>{
   try {
    const {email,password}: IUser = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(401).send({message:"User doesn't exist"})
    }
    const isPasswordIdentical = await bcrypt.compare(password,(await existingUser).password);
    if(isPasswordIdentical){
       const token =getUserToken((existingUser)._id);
       res.send({
        token,
        user:{
            email:existingUser.email,
            name:existingUser.name,
        }
       });
    }
    else{
        return res.status(400).send({message:"Wrong credentials"})
    }
   } catch (error) {
    console.log("Error in login user",error);
   }
}