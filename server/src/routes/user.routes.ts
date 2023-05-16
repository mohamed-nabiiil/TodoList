import express from 'express';
import { CreateUser, LoginUser } from '../controllers/user.controller';

const userRoutes = express.Router();

userRoutes.post('/create',CreateUser);
userRoutes.post('/login',LoginUser);




export default  userRoutes;