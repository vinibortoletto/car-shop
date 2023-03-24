import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import { carNotFound } from '../../../src/Utils/errorMessages';
import { NOT_FOUND } from '../../../src/Utils/httpStatusCodes';

describe('Unit tests for "CarService" class', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  describe('"create" method', function () {
    it('should be able to create a new car', async function () {
      const output: ICar = { ...mocks.carList[0], status: true };
      const input: ICar = mocks.car;
      Sinon.stub(Model, 'create').resolves(output);
  
      const result: Car | null = await carService.create(input);
      expect(result).to.deep.equal(output);
    });
  });
  
  describe('"find" method', function () {
    it('should be able to find all cars', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.carList);
      const result: (Car | null)[] = await carService.find();
      expect(result).to.deep.equal(mocks.carList);
    });
  });
  
  describe('"findById" method', function () {
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
  
  describe('"findByIdAndUpdate" method', function () {
    it('should be able to update a car by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);
      const result: Car | null = await carService.findByIdAndUpdate(mocks.car, mocks.carId);
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

  describe('"findByIdAndDelete" method', function () {
    it('should be able to remove a car by its id', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(true);
      const result: boolean = await carService.findByIdAndDelete(mocks.carId);
      expect(result).to.deep.equal(true);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
      try {
        await carService.findByIdAndDelete('wrong id');
      } catch (error) {
        expect(error).to.be.instanceof(Error);
        expect((error as Error).message).to.equal(carNotFound);
        expect((error as Error).stack).to.equal(String(NOT_FOUND));
      }
    });
  });
});
