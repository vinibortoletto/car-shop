import { Motorcycle } from '../Domains';
import { IMotorcycle } from '../Interfaces';
import { MotorcycleODM } from '../Models';
import { motorcycleNotFound } from '../Utils/errorMessages';
import AbstractService from './AbstractService';

export default class MotorcycleService extends AbstractService<IMotorcycle, Motorcycle> {
  constructor() {
    const model = new MotorcycleODM();
    const domain = MotorcycleService.createDomain;
    super(model, domain, motorcycleNotFound);
  }

  static createDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (!motorcycle) return null;
    return new Motorcycle(motorcycle);
  }
}
