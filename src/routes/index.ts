import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';

import AdminController from '../controllers/AdminController';
import SessionController from '../controllers/SessionController';
import EmployeeController from '../controllers/EmployeeController';
import CategoryController from '../controllers/CategoryController';

const routes = Router();

routes.post('/admin', AdminController.store);

routes.post('/category', AuthMiddleware, CategoryController.store);
routes.put('/category', AuthMiddleware, CategoryController.update);
routes.get('/category', AuthMiddleware, CategoryController.index);
routes.get('/category/:id', AuthMiddleware, CategoryController.show);
routes.delete('/category/:id', AuthMiddleware, CategoryController.destroy);

routes.post('/employee', AuthMiddleware, EmployeeController.store);
routes.put('/employee/:id', AuthMiddleware, EmployeeController.update);
routes.get('/employee', AuthMiddleware, EmployeeController.index);
routes.get('/employee/:id', AuthMiddleware, EmployeeController.show);
routes.delete('/employee/:id', AuthMiddleware, EmployeeController.destroy);

routes.post('/login', SessionController.store);

export default routes;
