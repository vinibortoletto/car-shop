import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "CarODM" class', function () {
  const model = new CarODM();

  afterEach(function () {
    Sinon.restore();
  });

  describe('"create" method', function () {
    it('should be able to create new car', async function () {
      Sinon.stub(Model, 'create').resolves(mocks.carList);
      const result: ICar = await model.create(mocks.car);
      expect(result).to.deep.equal(mocks.carList);
    });
  });

  describe('"find" method', function () {
    it('should be able to find all cars', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.carList);
      const result: ICar[] = await model.find();
      expect(result).to.deep.equal(mocks.carList);
    });
  });

  describe('"findById" method', function () {
    it('should be able to find car by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(mocks.car);
      const result: ICar | null = await model.findById(mocks.carId);
      expect(result).to.deep.equal(mocks.car);
    });
  });

  describe('"findByIdAndUpdate" method', function () {
    it('should be able to update a car by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);
      const result: ICar | null = await model.findByIdAndUpdate(mocks.car, mocks.carId);
      expect(result).to.deep.equal(mocks.carList[0]);
    });
  });
});