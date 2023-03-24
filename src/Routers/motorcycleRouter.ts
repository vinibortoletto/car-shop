import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import ValidateId from '../Middlewares/ValidateId';
import MotorcycleService from '../Services/MotorcycleService';

const motorcycleRouter = Router();
const service = new MotorcycleService();
const controller = new MotorcycleController(service);

motorcycleRouter.post(
  '/motorcycles', 
  controller.create.bind(controller),
);

motorcycleRouter.get(
  '/motorcycles', 
  controller.find.bind(controller),
);

motorcycleRouter.get(
  '/motorcycles/:id',
  ValidateId.validate,
  controller.findById.bind(controller),
);

motorcycleRouter.put(
  '/motorcycles/:id',
  ValidateId.validate,
  controller.findByIdAndUpdate.bind(controller),
);

export default motorcycleRouter;