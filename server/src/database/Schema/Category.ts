import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isEditable:{
        type:Boolean,
        required:false,
        default:true,
    },
    color:{
        id:String,
        name:String,
        code:String,
    },
    icon:{
        id:String,
        name:String,
        symbol:String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})


const Category = mongoose.model("Category",CategorySchema);

export default Category;