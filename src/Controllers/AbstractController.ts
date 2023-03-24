import { NextFunction, Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { AbstractService } from '../Services';
import { CREATED, NO_CONTENT, OK } from '../Utils/httpStatusCodes';

export default class AbstractController<I, D> {
  constructor(protected _service: AbstractService<I, D>) {}

  public async create(
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    const newObj: I = req.body;
    
    try {
      const obj: D | null = await this._service.create(newObj);
      return res.status(CREATED).json(obj);
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
      const objList: (D | null)[] = await this._service.find();
      return res.status(OK).json(objList);
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
      const obj: D | null = await this._service.findById(id);
      return res.status(OK).json(obj);
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
    const newObj: UpdateQuery<I> = req.body;

    try {
      const obj: D | null = await this._service.findByIdAndUpdate(newObj, id);
      return res.status(OK).json(obj);
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
