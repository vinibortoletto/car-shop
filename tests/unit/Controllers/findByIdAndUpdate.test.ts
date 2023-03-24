import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import NotFound from '../../../src/Errors/NotFound';
import CarService from '../../../src/Services/CarService';
import { carNotFound } from '../../../src/Utils/errorMessages';
import { OK } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "findByIdAndUpdate" method from CarController', function () {
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