import express from 'express';
import { authenticationMiddleware } from '../middleware';
import { getAllTasks,CreateTask ,ToggleTask, getAllTasksByCategory,getAllCompletedTasks,getTasksForToday, DeleteTask, EditTask} from '../controllers/task.controller';


const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.get('/',getAllTasks);
taskRoutes.get('/tasks-by-categories/:id',getAllTasksByCategory);
taskRoutes.get('/completed',getAllCompletedTasks);
taskRoutes.get('/today',getTasksForToday);
taskRoutes.post('/create',CreateTask);
taskRoutes.put('/update/:id',ToggleTask);
taskRoutes.delete('/:id',DeleteTask);
taskRoutes.put('/edit/:id',EditTask);

export default taskRoutes;