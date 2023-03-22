import { NextFunction, Response, Request } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  constructor(private _service: CarService) {}

  public async create(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const newCar = req.body;
    
    try {
      const car = await this._service.create(newCar);
      return res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  }
}
