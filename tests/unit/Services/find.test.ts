import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Unit tests for "find" method from CarService', function () {
  const carService = new CarService();
  
  it('should be able to find all cars', async function () {
    Sinon.stub(Model, 'find').resolves(mocks.carList);
    const result: (Car | null)[] = await carService.find();
    expect(result).to.deep.equal(mocks.carList);
    Sinon.restore();
  });
});
