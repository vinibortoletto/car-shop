import { NextFunction, Response, Request } from 'express';
import { Motorcycle } from '../Domains';
import { IMotorcycle } from '../Interfaces';
import MotorcycleService from '../Services/MotorcycleService';
import { CREATED, NO_CONTENT, OK } from '../Utils/httpStatusCodes';

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

  public async findByIdAndUpdate(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const { id } = req.params;
    const newMotorcycle: IMotorcycle = req.body;

    try {
      const motorcycle: Motorcycle | null = await this
        ._service
        .findByIdAndUpdate(newMotorcycle, id);

      return res.status(OK).json(motorcycle);
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
