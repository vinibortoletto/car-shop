import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import app from '../../../src/app';
import * as mocks from '../../mocks/carsMocks';
import * as status from '../../../src/Utils/httpStatusCodes';
import { carNotFound, invalidId } from '../../../src/Utils/errorMessages';

const ROUTE = '/cars';
const ROUTE_WITH_VALID_ID = `${ROUTE}/${mocks.carId}`;
const ROUTE_WITH_INVALID_ID = `${ROUTE}/invalid-id`;

describe('Integration tests for /cars route', function () {
  describe('POST /cars', function () {
    it('should be able to create new car', async function () {
      Sinon.stub(Model, 'create').resolves(mocks.carList[0]);
  
      await request(app)
        .post(ROUTE)
        .send(mocks.car)
        .expect(status.CREATED)
        .expect(mocks.carList[0]);
    });
  });
  
  describe('GET /cars', function () {
    it('should be able to find all cars', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.carList);
  
      await request(app)
        .get(ROUTE)
        .expect(status.OK)
        .expect(mocks.carList);
    });
  });

  describe('GET /cars/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to find a car by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(mocks.carList[0]);
  
      await request(app)
        .get(ROUTE_WITH_VALID_ID)
        .expect(status.OK)
        .expect(mocks.carList[0]);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      Sinon.stub(Model, 'findById').resolves(null);
  
      await request(app)
        .get(ROUTE_WITH_VALID_ID)
        .expect(status.NOT_FOUND)
        .expect({ message: carNotFound });
    });
  
    it('should throw UnprocessableContent error if id is invalid', async function () {
      Sinon.stub(Model, 'findById').resolves(null);
  
      await request(app)
        .get(ROUTE_WITH_INVALID_ID)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });

  describe('PUT /cars/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to update a car by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);
  
      await request(app)
        .put(ROUTE_WITH_VALID_ID)
        .expect(status.OK)
        .expect(mocks.carList[0]);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      await request(app)
        .put(ROUTE_WITH_VALID_ID)
        .send(mocks.car)
        .expect(status.NOT_FOUND)
        .expect({ message: carNotFound });
    });
  
    it('should throw UnprocessableContent error if id is invalid', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      await request(app)
        .put(ROUTE_WITH_INVALID_ID)
        .send(mocks.car)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });

  describe('DELETE /cars/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to delete a car by its id', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(mocks.carList[0]);
  
      await request(app)
        .delete(ROUTE_WITH_VALID_ID)
        .expect(status.NO_CONTENT);
    });
  
    it('should throw NotFound error if car does not exists in the database', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
      await request(app)
        .delete(ROUTE_WITH_VALID_ID)
        .send(mocks.car)
        .expect(status.NOT_FOUND)
        .expect({ message: carNotFound });
    });
  
    it('should throw UnprocessableContent error if id is invalid', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
      await request(app)
        .delete(ROUTE_WITH_INVALID_ID)
        .send(mocks.car)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });
});
