import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { findCarsOutput } from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for "find" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find all cars', async function () {
    const output: ICar[] = findCarsOutput;
    Sinon.stub(Model, 'find').resolves(output);
    const result: ICar[] = await carService.find();
    expect(result).to.deep.equal(output);
  });
});
