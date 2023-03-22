import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
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
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to create new car', async function () {
    Sinon.stub(carService, 'create').resolves(carsMocks);
    await carController.create();
    expect((res.status as SinonStub).calledWith(201)).to.equal(true);
    expect((res.json as SinonStub).calledWith(carsMocks)).to.equal(true);
  });
});