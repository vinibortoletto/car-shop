import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { Motorcycle } from '../../../src/Domains';
import { IMotorcycle } from '../../../src/Interfaces';
import { MotorcycleService } from '../../../src/Services';
import { motorcycleNotFound } from '../../../src/Utils/errorMessages';
import { NOT_FOUND } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/motorcyclesMocks';

describe('Unit tests for "MotorcycleService" class', function () {
  const service = new MotorcycleService();

  afterEach(function () {
    Sinon.restore();
  });

  describe('"create" method', function () {
    it('should be able to create a new motorcycle', async function () {
      const output: IMotorcycle = { ...mocks.motorcycleList[0], status: true };
      const input: IMotorcycle = mocks.motorcycle;
      Sinon.stub(Model, 'create').resolves(output);
  
      const result: Motorcycle | null = await service.create(input);
      expect(result).to.deep.equal(output);
    });
  });

  describe('"find" method', function () {
    it('should be able to find all motorcycles', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.motorcycleList);
      const result: (Motorcycle | null)[] = await service.find();
      expect(result).to.deep.equal(mocks.motorcycleList);
    });
  });

  describe('"findById" method', function () {
    it('should be able to find motorcycle by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(mocks.motorcycleList[0]);
      const result: Motorcycle | null = await service.findById(mocks.motorcycleId);
      expect(result).to.deep.equal(mocks.motorcycleList[0]);
    });
  
    it(
      'should throw NotFound error if motorcycle does not exists in the database', 
      async function () {
        Sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await service.findById('wrong id');
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect((error as Error).message).to.equal(motorcycleNotFound);
          expect((error as Error).stack).to.equal(String(NOT_FOUND));
        }
      },
    );
  });

  describe('"findByIdAndUpdate" method', function () {
    it('should be able to update a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.motorcycleList[0]);
      const result: Motorcycle | null = await service
        .findByIdAndUpdate(mocks.motorcycle, mocks.motorcycleId);
      expect(result).to.deep.equal(mocks.motorcycleList[0]);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      try {
        await service.findByIdAndUpdate(mocks.motorcycle, 'wrong id');
      } catch (error) {
        expect(error).to.be.instanceof(Error);
        expect((error as Error).message).to.equal(motorcycleNotFound);
        expect((error as Error).stack).to.equal(String(NOT_FOUND));
      }
    });
  });

  describe('"findByIdAndDelete" method', function () {
    it('should be able to remove a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(true);
      const result: boolean = await service.findByIdAndDelete(mocks.motorcycleId);
      expect(result).to.deep.equal(true);
    });
  
    it(
      'should throw NotFound error if motorcycle does not exists in the database', 
      async function () {
        Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
        try {
          await service.findByIdAndDelete('wrong id');
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect((error as Error).message).to.equal(motorcycleNotFound);
          expect((error as Error).stack).to.equal(String(NOT_FOUND));
        }
      },
    );
  });
});
