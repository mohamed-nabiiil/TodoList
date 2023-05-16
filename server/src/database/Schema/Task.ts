import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
    name:{
         type:String,
         required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    isEditable:{
        type:Boolean,
        default:false,
    },
    date:{
        type:String,
        required:true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true,  
    },
},
{
    timestamps:true,
}
)

const Task = mongoose.model('Task',TaskSchema);
export default Task;