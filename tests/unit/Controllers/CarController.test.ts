import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import NotFound from '../../../src/Errors/NotFound';
import CarService from '../../../src/Services/CarService';
import { carNotFound } from '../../../src/Utils/errorMessages';
import { CREATED, OK } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "CarController" class', function () {
  let req = {} as Request;
  const res = {} as Response;
  let next: SinonStub;
    
  const service = new CarService();
  const controller = new CarController(service);

  beforeEach(function () {
    next = Sinon.stub();
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(function () {
    Sinon.restore();
  });
  
  describe('"create" method', function () {
    it('should be able to create new car', async function () {
      const output: Car = new Car(mocks.carList[0]);
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
    it('should be able to find all cars', async function () {
      const output: Car[] = mocks.carList.map((car) => new Car(car));
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
    it('should be able to find car by its id', async function () {
      const output: Car = new Car(mocks.car);
      Sinon.stub(service, 'findById').resolves(output);
      req = { params: mocks.carId } as unknown as Request;
      
      await controller.findById(req, res, next);
      
      expect((res.status as SinonStub).calledWith(OK)).to.equal(true);
      expect((res.json as SinonStub).calledWith(output)).to.equal(true);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      req = { params: 'wrong id' } as unknown as Request;
      const error = new NotFound(carNotFound);
      Sinon.stub(service, 'findById').rejects(error);
  
      await controller.findById(req, res, next);
      expect(next.calledWith(error)).to.equal(true);
    });
  });

  describe('"findByIdAndUpdate" method', function () {
    it('should be able to update a car by its id', async function () {
      req = { 
        params: { id: mocks.carId }, 
        body: mocks.car,
      } as unknown as Request;
  
      const output: Car = new Car(mocks.carList[0]);
      Sinon.stub(service, 'findByIdAndUpdate').resolves(output);
      await controller.findByIdAndUpdate(req, res, next);
      expect((res.status as SinonStub).calledWith(OK)).to.equal(true);
      expect((res.json as SinonStub).calledWith(output)).to.equal(true);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      req = { 
        params: { id: 'wrong id' }, 
        body: mocks.car,
      } as unknown as Request;
  
      const error = new NotFound(carNotFound);
      Sinon.stub(service, 'findById').rejects(error);
  
      await controller.findById(req, res, next);
      expect(next.calledWith(error)).to.equal(true);
    });
  });
});