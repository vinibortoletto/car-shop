import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import app from '../../../src/app';
import { OK } from '../../../src/Utils/httpStatusCodes';

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
});
