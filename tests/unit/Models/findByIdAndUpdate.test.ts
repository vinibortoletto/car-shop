import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "findByIdAndUpdate" method from CarODM', function () {
  const model = new CarODM();

  it('should be able to update a car by its id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);
    const result: ICar | null = await model.findByIdAndUpdate(mocks.car, mocks.carId);
    expect(result).to.deep.equal(mocks.carList[0]);
  });
});