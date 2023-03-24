import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { CREATED } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/carsMocks';

describe('Unit tests for "create" method from CarController', function () {
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