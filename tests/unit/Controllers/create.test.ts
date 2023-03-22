import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import carsMocks from '../../mocks/carsMocks';

describe('Unit tests for "create" method from CarController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = (() => {}) as NextFunction;
    
  const carService = new CarService();
  const carController = new CarController(req, res, next, carService);

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should be able to create new car', async function () {
    sinon.stub(carService, 'create').resolves(carsMocks);
    await carController.create();
    expect((res.status as SinonStub).calledWith(201)).to.equal(true);
    expect((res.json as SinonStub).calledWith(carsMocks)).to.equal(true);
  });
});