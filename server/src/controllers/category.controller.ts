import Category from "../database/Schema/Category";
import { AuthRequest } from "../middleware";
import { ICategory } from "../types";


export const getAllCategories=async(req:AuthRequest,res)=>{
 try {
    const {user}=req
    const categories = await Category.find({
        user:user,
    });
    return res.send(categories);
 } catch (error) {
    console.log("Error in getAllCategories",error)
 }
} 

export const CreateCategories=async(req:AuthRequest,res)=>{
    try {
       const {color,icon,isEditable,name}:ICategory=req.body;
       const {user} =req;
       const newCategory = await Category.create({
        color,
        icon,
        isEditable,
        name,
        user,
       });
       res.send(newCategory);

    } catch (error) {
       console.log("Error in Create Category",error)
       res.send({error:"Something went wrong!"})
    }
   } 


   export const DeleteCategory=async(req:AuthRequest,res)=>{
    try {
       const {id} = req.params;
       await Category.deleteMany({_id:id});
       res.send({message:"Category Deleted"});

    } catch (error) {
       console.log("Error in Delete Category",error)
       res.send({error:"Something went wrong!"})
    }
   } 


   export const UpdateCategory=async(req:AuthRequest,res)=>{
    try {
       const {_id,color,icon,isEditable,name}:ICategory=req.body;
       await Category.updateOne({_id},{$set:{name,color,icon,isEditable}});
       res.send({message:"Category Updated Successfully!"});       
       
    } catch (error) {
       console.log("Error in Update Category",error)
       res.send({error:"Something went wrong!"})
    }
   } 