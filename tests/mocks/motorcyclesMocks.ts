import { IMotorcycle } from '../../src/Interfaces';

export const motorcycleId = '6348513f34c397abcad040b2';

export const motorcycleList: IMotorcycle[] = [
  {
    id: motorcycleId,
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
];

export const motorcycle: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};