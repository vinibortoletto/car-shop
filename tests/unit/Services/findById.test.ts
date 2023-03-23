import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for "findById" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find car by its id', async function () {
    Sinon.stub(Model, 'findById').resolves(mocks.car);
    const result: ICar | null = await carService.findById(mocks.carId);
    expect(result).to.deep.equal(mocks.car);
  });
});
