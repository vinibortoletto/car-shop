import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleService from '../Services/MotorcycleService';

const motorcycleRouter = Router();
const service = new MotorcycleService();
const controller = new MotorcycleController(service);

motorcycleRouter.post('/motorcycles', controller.create.bind(controller));
motorcycleRouter.get('/motorcycles', controller.find.bind(controller));
motorcycleRouter.get('/motorcycles/:id', controller.findById.bind(controller));

export default motorcycleRouter;