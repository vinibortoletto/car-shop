import { Car } from '../Domains';
import { ICar } from '../Interfaces';
import { CarService } from '../Services';
import AbstractController from './AbstractController';

export default class CarController extends AbstractController<ICar, Car> {
  protected _service: CarService;
  
  constructor(service: CarService) {
    super(service);
    this._service = service;
  }
}
