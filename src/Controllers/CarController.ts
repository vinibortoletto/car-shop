import { NextFunction, Response, Request } from 'express';
import { Car } from '../Domains';
import { ICar } from '../Interfaces';
import CarService from '../Services/CarService';
import { CREATED, NO_CONTENT, OK } from '../Utils/httpStatusCodes';

export default class CarController {
  constructor(private _service: CarService) {}

  public async create(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const newCar: ICar = req.body;
    
    try {
      const car: Car | null = await this._service.create(newCar);
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
      const carList: (Car | null)[] = await this._service.find();
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
      const car: Car | null = await this._service.findById(id);
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
    const newCar: ICar = req.body;

    try {
      const car: Car | null = await this._service.findByIdAndUpdate(newCar, id);
      return res.status(OK).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async findByIdAndDelete(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      await this._service.findByIdAndDelete(id);
      return res.status(NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}
