import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import app from '../../../src/app';
import { CREATED } from '../../../src/Utils/httpStatusCodes';
import { motorcycle, motorcycleList } from '../../mocks/motorcyclesMocks';

describe('Integration tests for "motorcycles" routes', function () {
  describe('POST /motorcycles', function () {
    it('should be able to create new motorcycle', async function () {
      Sinon.stub(Model, 'create').resolves(motorcycleList[0]);
  
      await request(app)
        .post('/motorcycles')
        .send(motorcycle)
        .expect(CREATED)
        .expect(motorcycleList[0]);
    });
  });
});
