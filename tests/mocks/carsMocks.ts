import ICar from '../../src/Interfaces/ICar';

export const createCarInput = {
  model: 'Uno da Escada',
  year: 1960,
  color: 'Red',
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

export const createCarOutput = {
  id: '641b82d428a938f06b73cefe',
  model: 'Uno da Escada',
  year: 1960,
  color: 'Red',
  status: false,
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

export const findCarsOutput: ICar[] = [
  {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39.000,
    doorsQty: 2,
    seatsQty: 5,
  },
];

export const carId = '641b82d428a938f06b73cefe';

export const car: ICar = {
  model: 'Uno da Escada',
  year: 1960,
  color: 'Red',
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};