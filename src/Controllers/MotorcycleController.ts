import { Motorcycle } from '../Domains';
import { IMotorcycle } from '../Interfaces';
import { MotorcycleService } from '../Services';
import AbstractController from './AbstractController';

export default class MotorcycleController extends AbstractController<IMotorcycle, Motorcycle> {
  protected _service: MotorcycleService;
  
  constructor(service: MotorcycleService) {
    super(service);
    this._service = service;
  }
}
