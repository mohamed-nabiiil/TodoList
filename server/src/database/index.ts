import mongoose from "mongoose";

const connectToDatabase =async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://MohamEd:Mohamed123@cluster0.6vehepj.mongodb.net/Todo");
        if(connection){
            console.log("Connected to DB");
        }

    } catch (error) {
        console.log("Error in connect to DataBase",error);
    }
}
export default connectToDatabase;