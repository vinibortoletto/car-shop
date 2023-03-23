import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import { findCarsOutput } from '../../mocks/carsMocks';

describe('Unit tests for "find" method from CarController', function () {
  const req = {} as Request;
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

  it('should be able to find all cars', async function () {
    Sinon.stub(service, 'find').resolves(findCarsOutput);
    await controller.find(req, res, next);
    expect((res.status as SinonStub).calledWith(200)).to.equal(true);
    expect((res.json as SinonStub).calledWith(findCarsOutput)).to.equal(true);
  });

  it('should throw Internal Server Error', async function () {
    const error = new Error('Internal Server Error');
    Sinon.stub(service, 'find').rejects(error);
    await controller.find(req, res, next);
    expect(next.calledWith(error)).to.equal(true);
  });
});