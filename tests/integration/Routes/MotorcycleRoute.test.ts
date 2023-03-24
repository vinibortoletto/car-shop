import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import app from '../../../src/app';
import { CREATED, NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/motorcyclesMocks';
import { invalidId, motorcycleNotFound } from '../../../src/Utils/errorMessages';

describe('Integration tests for "motorcycles" routes', function () {
  describe('POST /motorcycles', function () {
    it('should be able to create new motorcycle', async function () {
      Sinon.stub(Model, 'create').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .post('/motorcycles')
        .send(mocks.motorcycle)
        .expect(CREATED)
        .expect(mocks.motorcycleList[0]);
    });
  });

  describe('GET /motorcycles', function () {
    it('should be able to find all motorcycles', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.motorcycleList);
  
      await request(app)
        .get('/motorcycles')
        .expect(OK)
        .expect(mocks.motorcycleList);
    });
  });

  describe('GET /motorcycles/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to find a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .get(`/motorcycles/${mocks.motorcycleId}`)
        .expect(OK)
        .expect(mocks.motorcycleList[0]);
    });
  
    it(
      'should throw NotFound error if motorcycle does not exists in the database', 
      async function () {
        Sinon.stub(Model, 'findById').resolves(null);
  
        await request(app)
          .get(`/motorcycles/${mocks.motorcycleId}`)
          .expect(NOT_FOUND)
          .expect({ message: motorcycleNotFound });
      },
    );
  
    it('should throw UnprocessableContent error if id is invalid', async function () {
      Sinon.stub(Model, 'findById').resolves(null);
  
      await request(app)
        .get('/motorcycles/invalid-id')
        .expect(UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });

  describe('PUT /cars/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to update a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .put(`/motorcycles/${mocks.motorcycleId}`)
        .expect(OK)
        .expect(mocks.motorcycleList[0]);
    });
  
    it(
      'should throw NotFound error if motorcycle does not exists in the database',
      async function () {
        Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
        await request(app)
          .put(`/motorcycles/${mocks.motorcycleId}`)
          .send(mocks.motorcycle)
          .expect(NOT_FOUND)
          .expect({ message: motorcycleNotFound });
      },
    );
  
    it('should throw UnprocessableContent error if id is invalid', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      await request(app)
        .put('/motorcycles/invalid-id')
        .send(mocks.motorcycle)
        .expect(UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });
});
