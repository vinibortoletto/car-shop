import { Router } from 'express';
import CarController from '../Controllers/CarController';
import ValidateId from '../Middlewares/ValidateId';
import CarService from '../Services/CarService';

const router = Router();
const service = new CarService();
const controller = new CarController(service);

router.post('/cars', controller.create.bind(controller));
router.get('/cars', controller.find.bind(controller));
router.get(
  '/cars/:id', 
  ValidateId.validate,
  controller.findById.bind(controller),
);

router.put(
  '/cars/:id', 
  ValidateId.validate,
  controller.findByIdAndUpdate.bind(controller),
);

export default router;