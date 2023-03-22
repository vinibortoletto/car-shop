import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import carsMocks from '../../mocks/carsMocks';

describe('Unit tests for "create" method from CarODM', function () {
  const model = new CarODM();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to create new car', async function () {
    Sinon.stub(Model, 'create').resolves(carsMocks);
    const result = await model.create(carsMocks);
    expect(result).to.deep.equal(carsMocks);
  });
});