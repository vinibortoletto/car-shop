import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../Utils/httpStatusCodes';

export default class ErrorHandler {
  static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    const code = Number(error.stack) || INTERNAL_SERVER_ERROR;
    return res.status(code).json({ message: error.message });
  }
}
