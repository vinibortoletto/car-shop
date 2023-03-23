import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "findById" method from CarController', function () {
  let req = {} as Request;
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

  it('should be able to find car by its id', async function () {
    req = { params: mocks.carId } as unknown as Request;
    Sinon.stub(service, 'findById').resolves(mocks.car);
    await controller.findById(req, res, next);
    expect((res.status as SinonStub).calledWith(200)).to.equal(true);
    expect((res.json as SinonStub).calledWith(mocks.car)).to.equal(true);
  });
});