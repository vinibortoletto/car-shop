import { NextFunction, Response, Request } from 'express';
import { Motorcycle } from '../Domains';
import MotorcycleService from '../Services/MotorcycleService';
import { CREATED, OK } from '../Utils/httpStatusCodes';

export default class MotorcycleController {
  constructor(private _service: MotorcycleService) {}

  public async create(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const newMotorcycle = req.body;
    
    try {
      const motorcycle = await this._service.create(newMotorcycle);
      return res.status(CREATED).json(motorcycle);
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
      const motorcycleList = await this._service.find();
      return res.status(OK).json(motorcycleList);
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
      const motorcycle: Motorcycle | null = await this._service.findById(id);
      return res.status(OK).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }
}
