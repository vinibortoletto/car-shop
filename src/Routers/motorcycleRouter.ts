import { Router } from 'express';
import { MotorcycleController } from '../Controllers';
import { ValidateId } from '../Middlewares';
import { MotorcycleService } from '../Services';

const motorcycleRouter = Router();
const service = new MotorcycleService();
const controller = new MotorcycleController(service);

motorcycleRouter.post(
  '/', 
  controller.create.bind(controller),
);

motorcycleRouter.get(
  '/', 
  controller.find.bind(controller),
);

motorcycleRouter.get(
  '/:id',
  ValidateId.validate,
  controller.findById.bind(controller),
);

motorcycleRouter.put(
  '/:id',
  ValidateId.validate,
  controller.findByIdAndUpdate.bind(controller),
);

motorcycleRouter.delete(
  '/:id', 
  ValidateId.validate,
  controller.findByIdAndDelete.bind(controller),
);

export default motorcycleRouter;