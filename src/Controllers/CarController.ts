import { NextFunction, Response, Request } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  constructor(
    private _req: Request,
    private _res: Response,
    private _next: NextFunction,
    private _service: CarService,
  ) {}

  public async create() {
    const newCar = this._req.body;
    
    try {
      const car = await this._service.create(newCar);
      return this._res.status(201).json(car);
    } catch (error) {
      this._next(error);
    }
  }
}
