import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
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

    Sinon.stub(service, 'findByIdAndUpdate').resolves(mocks.carList[0]);
    await controller.findByIdAndUpdate(req, res, next);
    expect((res.status as SinonStub).calledWith(OK)).to.equal(true);
    expect((res.json as SinonStub).calledWith(mocks.carList[0])).to.equal(true);
  });
});