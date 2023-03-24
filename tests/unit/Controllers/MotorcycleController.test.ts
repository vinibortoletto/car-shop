import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import { MotorcycleController } from '../../../src/Controllers';
import { Motorcycle } from '../../../src/Domains';
import NotFound from '../../../src/Errors/NotFound';
import { MotorcycleService } from '../../../src/Services';
import { motorcycleNotFound } from '../../../src/Utils/errorMessages';
import { CREATED, OK } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/motorcyclesMocks';

describe('Unit tests for "MotorcycleController" class', function () {
  let req = {} as Request;
  const res = {} as Response;
  let next: SinonStub;
    
  const service = new MotorcycleService();
  const controller = new MotorcycleController(service);

  beforeEach(function () {
    next = Sinon.stub();
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(function () {
    Sinon.restore();
  });
  
  describe('"create" method', function () {
    it('should be able to create new motorcycle', async function () {
      const output: Motorcycle = new Motorcycle(mocks.motorcycleList[0]);
      Sinon.stub(service, 'create').resolves(output);
      
      await controller.create(req, res, next);
  
      expect((res.status as SinonStub).calledWith(CREATED)).to.equal(true);
      expect((res.json as SinonStub).calledWith(output)).to.equal(true);
    });
  
    it('should throw Internal Server Error', async function () {
      const error = new Error('Internal Server Error');
      Sinon.stub(service, 'create').rejects(error);
      await controller.create(req, res, next);
      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('"find" method', function () {
    it('should be able to find all motorcycles', async function () {
      const output: Motorcycle[] = mocks.motorcycleList.map(
        (motorcycle) => new Motorcycle(motorcycle),
      );
      Sinon.stub(service, 'find').resolves(output);
      await controller.find(req, res, next);
      expect((res.status as SinonStub).calledWith(OK)).to.equal(true);
      expect((res.json as SinonStub).calledWith(output)).to.equal(true);
    });
  
    it('should throw Internal Server Error', async function () {
      const error = new Error('Internal Server Error');
      Sinon.stub(service, 'find').rejects(error);
      await controller.find(req, res, next);
      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('"findById" method', function () {
    it('should be able to find motorcycle by its id', async function () {
      const output: Motorcycle = new Motorcycle(mocks.motorcycle);
      Sinon.stub(service, 'findById').resolves(output);
      req = { params: mocks.motorcycleId } as unknown as Request;
      
      await controller.findById(req, res, next);
      
      expect((res.status as SinonStub).calledWith(OK)).to.equal(true);
      expect((res.json as SinonStub).calledWith(output)).to.equal(true);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      req = { params: 'wrong id' } as unknown as Request;
      const error = new NotFound(motorcycleNotFound);
      Sinon.stub(service, 'findById').rejects(error);
  
      await controller.findById(req, res, next);
      expect(next.calledWith(error)).to.equal(true);
    });
  });
});