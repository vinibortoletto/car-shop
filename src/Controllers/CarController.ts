import { NextFunction, Response, Request } from 'express';
import CarService from '../Services/CarService';
import { CREATED, OK } from '../Utils/httpStatusCodes';

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
      return res.status(CREATED).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async find(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    try {
      const carList = await this._service.find();
      return res.status(OK).json(carList);
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const car = await this._service.findById(id);
      return res.status(OK).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async findByIdAndUpdate(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const { id } = req.params;
    const newCar = req.body;

    try {
      const car = await this._service.findByIdAndUpdate(newCar, id);
      return res.status(OK).json(car);
    } catch (error) {
      next(error);
    }
  }
}
