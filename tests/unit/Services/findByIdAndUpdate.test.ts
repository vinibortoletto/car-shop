import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for "findByIdAndUpdate" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to update a car by its id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);
    const result: ICar | null = await carService.findByIdAndUpdate(mocks.car, mocks.carId);
    expect(result).to.deep.equal(mocks.carList[0]);
  });
});
