import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for "find" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find all cars', async function () {
    Sinon.stub(Model, 'find').resolves(mocks.carList);
    const result: ICar[] = await carService.find();
    expect(result).to.deep.equal(mocks.carList);
  });
});
