import express from 'express';
import { getAllCategories , CreateCategories,DeleteCategory,UpdateCategory} from '../controllers/category.controller';
import { authenticationMiddleware } from '../middleware';

const categoryRoute = express.Router();

categoryRoute.use(authenticationMiddleware);

categoryRoute.get('/',getAllCategories);
categoryRoute.post('/create',CreateCategories);
categoryRoute.delete('/:id',DeleteCategory);
categoryRoute.put('/update',UpdateCategory);



export default categoryRoute;