import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import carsMocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Unit tests for creating a new car', function () {
  const carService = new CarService();

  afterEach(function () {
    sinon.restore();
  });

  it('should be able to create a new car', async function () {
    const output: ICar = { ...carsMocks, status: true };
    const input: ICar = carsMocks;

    sinon.stub(Model, 'create').resolves(output);
    const result: ICar = await carService.create(input);

    expect(result).to.deep.equal(output);
  });
});
