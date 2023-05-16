import Task from "../database/Schema/Task";
import { AuthRequest } from "../middleware";
import { ITask } from "../types";




export const getAllTasks =async(req:AuthRequest,res)=>{
    try {
        const userId= req.user;
        const tasks = await Task.find({
            user:userId,
        });
        res.send(tasks);

    } catch (error) {
        console.log("Error in Get All Tasks",error);
    }
}

export const getAllTasksByCategory =async(req:AuthRequest,res)=>{
    try {
        const userId= req.user;
        const {id} = req.params;
        const tasks = await Task.find({
            user:userId,
            categoryId:id,
        });
        res.send(tasks);

    } catch (error) {
        console.log("Error in Get All Tasks By Category",error);
    }
}

export const getAllCompletedTasks =async(req:AuthRequest,res)=>{
    try { 
        const userId= req.user;
        const tasks = await Task.find({
            user:userId,
            isCompleted:true,
        });
        res.send(tasks);

    } catch (error) {
        console.log("Error in Get All Completed Tasks ",error);
    }
}

export const getTasksForToday =async(req:AuthRequest,res)=>{
    try { 
        const userId= req.user;
        const todayISDate = new Date();
        todayISDate.setHours(0,0,0,0);
        const tasks = await Task.find({
            user:userId,
            date:todayISDate.toISOString(),
        });
        res.send(tasks);

    } catch (error) {
        console.log("Error in Get Tasks For Today ",error);
    }
}

export const CreateTask =async(req:AuthRequest,res)=>{
try {
    const userId = req.user;
    const {name,date,categoryId}:ITask = req.body;
    const newtask = await Task.create({
        name,
        date,
        categoryId,
        user:userId,
    });
    res.send(newtask);
} catch (error) {
    console.log("Error in Create Task",error);
    res.send({error:"Error while creating task"});
}
}

export const ToggleTask =async(req:AuthRequest,res)=>{
    try {
        const {isCompleted} = req.body;
        const {id}=req.params;
         const task = await Task.updateOne({
            _id:id,
        },
        {
            isCompleted,
        }
        );
        res.send(task);
       
    } catch (error) {
        console.log("Error in Toggle Task",error);
        res.send({error:"Error while Toggling task"});
    }
}

export const DeleteTask =async(req:AuthRequest,res)=>{
    try {
        const {id}=req.params;
         await Task.deleteOne({
            _id:id,
        });
        res.send({message:"Task Deleted"});
       
    } catch (error) {
        console.log("Error in Delete Task",error);
        res.send({error:"Error while Delteing task"});
    }
}

export const EditTask =async(req:AuthRequest,res)=>{
    try {
        const {_id,categoryId,date,name}:ITask = req.body;
        
         await Task.updateOne({
            _id,
        },
        {
            $set:{
                name,
                date,
                categoryId,
            },
        });
        res.send({message:"Task Updated Successfully"})
       
    } catch (error) {
        console.log("Error in Edit Task",error);
        res.send({error:"Error while Edit task"});
    }
}