import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const router = Router();
const carService = new CarService();

router.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next, carService).create,
);

export default router;