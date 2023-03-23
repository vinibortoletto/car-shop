import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "findById" method from CarODM', function () {
  const model = new CarODM();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find car by its id', async function () {
    Sinon.stub(Model, 'findById').resolves(mocks.car);
    const result: ICar | null = await model.findById(mocks.carId);
    expect(result).to.deep.equal(mocks.car);
  });
});