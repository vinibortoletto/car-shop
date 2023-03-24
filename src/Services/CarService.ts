import { Car } from '../Domains';
import { ICar } from '../Interfaces';
import { CarODM } from '../Models';
import { carNotFound } from '../Utils/errorMessages';
import AbstractService from './AbstractService';

export default class CarService extends AbstractService<ICar, Car> {
  constructor() {
    const model = new CarODM();
    const domain = CarService.createDomain;
    super(model, domain, carNotFound);
  }

  static createDomain(car: ICar | null): Car | null {
    if (!car) return null;
    return new Car(car);
  }
}
