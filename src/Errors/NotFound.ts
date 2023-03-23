import { NOT_FOUND } from '../Utils/httpStatusCodes';

export default class NotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFound';
    this.stack = String(NOT_FOUND);
  }
}
