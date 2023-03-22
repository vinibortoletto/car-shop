import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { createCarInput, createCarOutput } from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for "create" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to create a new car', async function () {
    const output: ICar = { ...createCarOutput, status: true };
    const input: ICar = createCarInput;

    Sinon.stub(Model, 'create').resolves(output);
    const result: ICar = await carService.create(input);

    expect(result).to.deep.equal(output);
  });
});
