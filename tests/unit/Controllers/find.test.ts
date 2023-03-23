import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import { findCarsOutput } from '../../mocks/carsMocks';

describe('Unit tests for "find" method from CarController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = (() => {}) as NextFunction;
    
  const service = new CarService();
  const controller = new CarController(service);

  beforeEach(function () {
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to find all cars', async function () {
    Sinon.stub(service, 'find').resolves(findCarsOutput);
    await controller.find(req, res, next);
    expect((res.status as SinonStub).calledWith(200)).to.equal(true);
    expect((res.json as SinonStub).calledWith(findCarsOutput)).to.equal(true);
  });
});