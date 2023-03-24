import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "find" method from CarODM', function () {
  const model = new CarODM();

  it('should be able to find all cars', async function () {
    Sinon.stub(Model, 'find').resolves(mocks.carList);
    const result: ICar[] = await model.find();
    expect(result).to.deep.equal(mocks.carList);
    Sinon.restore();
  });
});