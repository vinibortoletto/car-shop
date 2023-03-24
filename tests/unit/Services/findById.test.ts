import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import CarService from '../../../src/Services/CarService';
import { carNotFound } from '../../../src/Utils/errorMessages';
import { NOT_FOUND } from '../../../src/Utils/httpStatusCodes';
import Car from '../../../src/Domains/Car';

describe('Unit tests for "findById" method from CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find car by its id', async function () {
    Sinon.stub(Model, 'findById').resolves(mocks.carList[0]);
    const result: Car | null = await carService.findById(mocks.carId);
    expect(result).to.deep.equal(mocks.carList[0]);
  });

  it('should throw NotFound error if car does not exists in the database', async function () {
    Sinon.stub(Model, 'findById').resolves(null);

    try {
      await carService.findById('wrong id');
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect((error as Error).message).to.equal(carNotFound);
      expect((error as Error).stack).to.equal(String(NOT_FOUND));
    }
  });
});
