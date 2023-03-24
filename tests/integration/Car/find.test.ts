import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import app from '../../../src/app';
import { OK } from '../../../src/Utils/httpStatusCodes';

describe('Integration tests for finding all cars', function () {
  it('should be able to find all cars', async function () {
    Sinon.stub(Model, 'find').resolves(mocks.carList);

    await request(app)
      .get('/cars')
      .expect(OK)
      .expect(mocks.carList);
  });
});
