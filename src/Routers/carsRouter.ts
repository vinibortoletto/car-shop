import { Router } from 'express';
import { CarController } from '../Controllers';
import { ValidateId } from '../Middlewares';
import { CarService } from '../Services';

const carRouter = Router();
const service = new CarService();
const controller = new CarController(service);

carRouter.post(
  '/', 
  controller.create.bind(controller),
);

carRouter.get(
  '/', 
  controller.find.bind(controller),
);
  
carRouter.get(
  '/:id', 
  ValidateId.validate,
  controller.findById.bind(controller),
);

carRouter.put(
  '/:id', 
  ValidateId.validate,
  controller.findByIdAndUpdate.bind(controller),
);

carRouter.delete(
  '/:id', 
  ValidateId.validate,
  controller.findByIdAndDelete.bind(controller),
);

export default carRouter;