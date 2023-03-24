import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Unit tests for "create" method from CarService', function () {
  const carService = new CarService();
  
  it('should be able to create a new car', async function () {
    const output: ICar = { ...mocks.carList[0], status: true };
    const input: ICar = mocks.car;
    Sinon.stub(Model, 'create').resolves(output);

    const result: Car | null = await carService.create(input);
    expect(result).to.deep.equal(output);

    Sinon.restore();
  });
});
