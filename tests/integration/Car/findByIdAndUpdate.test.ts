import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import app from '../../../src/app';
import { NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from '../../../src/Utils/httpStatusCodes';
import { carNotFound, invalidId } from '../../../src/Utils/errorMessages';

describe('Integration tests for updating a car by its id', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('should be able to update a car by its id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.carList[0]);

    await request(app)
      .put(`/cars/${mocks.carId}`)
      .expect(OK)
      .expect(mocks.carList[0]);
  });

  it('should throw NotFound error if car does not exists in the database', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    await request(app)
      .put(`/cars/${mocks.carId}`)
      .send(mocks.car)
      .expect(NOT_FOUND)
      .expect({ message: carNotFound });
  });

  it('should throw UnprocessableContent error if id is invalid', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    await request(app)
      .put('/cars/invalid-id')
      .send(mocks.car)
      .expect(UNPROCESSABLE_CONTENT)
      .expect({ message: invalidId });
  });
});
