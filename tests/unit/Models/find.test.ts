import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import { findCarsOutput } from '../../mocks/carsMocks';

describe('Unit tests for "find" method from CarODM', function () {
  const model = new CarODM();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find all cars', async function () {
    Sinon.stub(Model, 'find').resolves(findCarsOutput);
    const result = await model.find();
    expect(result).to.deep.equal(findCarsOutput);
  });
});