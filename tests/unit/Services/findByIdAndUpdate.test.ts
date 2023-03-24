import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import { carNotFound } from '../../../src/Utils/errorMessages';
import { NOT_FOUND } from '../../../src/Utils/httpStatusCodes';

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

  it('should throw NotFound error if car does not exists in the database', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      await carService.findByIdAndUpdate(mocks.car, 'wrong id');
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect((error as Error).message).to.equal(carNotFound);
      expect((error as Error).stack).to.equal(String(NOT_FOUND));
    }
  });
});
