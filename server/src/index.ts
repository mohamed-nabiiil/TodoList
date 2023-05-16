import express, { Request, Response } from "express";
import connectToDatabase from "./database";
import userRoutes from "./routes/user.routes";
import categoryRoute from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())


const PORT=5000;

connectToDatabase()
app.get('/todo',(req ,res )=>{
   res.send("Hello");
});

app.use('/users',userRoutes);
app.use('/categories',categoryRoute);
app.use('/tasks',taskRoutes);

app.listen(PORT,()=>{
    console.log(`Server is Running on Port: http://localhost:${PORT} `);
})
