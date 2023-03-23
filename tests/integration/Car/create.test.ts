import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import * as mocks from '../../mocks/carsMocks';
import app from '../../../src/app';
import { CREATED } from '../../../src/Utils/httpStatusCodes';

describe('Integration tests for creating new car', function () {
  it('should be able to create new car', async function () {
    Sinon.stub(Model, 'create').resolves(mocks.carList[0]);

    await request(app)
      .post('/cars')
      .send(mocks.car)
      .expect(CREATED)
      .expect(mocks.carList[0]);
  });
});
