import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import UnprocessableContent from '../Errors/UnprocessableContent';
import { invalidId } from '../Utils/errorMessages';

export default class ValidateId {
  public static validate(
    req: Request, 
    _res: Response, 
    next: NextFunction,
  ): void {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      throw new UnprocessableContent(invalidId);
    }
    
    next();
  }
}
