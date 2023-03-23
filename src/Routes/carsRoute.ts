import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const router = Router();
const service = new CarService();
const controller = new CarController(service);

router.post('/cars', controller.create.bind(controller));
router.get('/cars', controller.find.bind(controller));
router.get('/cars/:id', controller.findById.bind(controller));

export default router;