import request from 'supertest';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import app from '../../../src/app';
import * as status from '../../../src/Utils/httpStatusCodes';
import * as mocks from '../../mocks/motorcyclesMocks';
import { invalidId, motorcycleNotFound } from '../../../src/Utils/errorMessages';

const ROUTE = '/motorcycles';
const ROUTE_WITH_VALID_ID = `${ROUTE}/${mocks.motorcycleId}`;
const ROUTE_WITH_INVALID_ID = `${ROUTE}/invalid-id`;

const MOTORCYCLE_NOT_FOUND_DESCRIPTION = `should throw NotFound error if motorcycle 
does not exists in the database`;

const INVALID_ID_DESCRIPTION = `should throw UnprocessableContent 
error if id is invalid`;

describe('Integration tests for "motorcycles" routes', function () {
  describe('POST /motorcycles', function () {
    it('should be able to create new motorcycle', async function () {
      Sinon.stub(Model, 'create').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .post(ROUTE)
        .send(mocks.motorcycle)
        .expect(status.CREATED)
        .expect(mocks.motorcycleList[0]);
    });
  });

  describe('GET /motorcycles', function () {
    it('should be able to find all motorcycles', async function () {
      Sinon.stub(Model, 'find').resolves(mocks.motorcycleList);
  
      await request(app)
        .get(ROUTE)
        .expect(status.OK)
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
        .get(ROUTE_WITH_VALID_ID)
        .expect(status.OK)
        .expect(mocks.motorcycleList[0]);
    });
  
    it(
      MOTORCYCLE_NOT_FOUND_DESCRIPTION, 
      async function () {
        Sinon.stub(Model, 'findById').resolves(null);
  
        await request(app)
          .get(ROUTE_WITH_VALID_ID)
          .expect(status.NOT_FOUND)
          .expect({ message: motorcycleNotFound });
      },
    );
  
    it(INVALID_ID_DESCRIPTION, async function () {
      Sinon.stub(Model, 'findById').resolves(null);
  
      await request(app)
        .get(ROUTE_WITH_INVALID_ID)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });

  describe('PUT /motorcycles/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to update a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .put(ROUTE_WITH_VALID_ID)
        .expect(status.OK)
        .expect(mocks.motorcycleList[0]);
    });
  
    it(MOTORCYCLE_NOT_FOUND_DESCRIPTION, async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      await request(app)
        .put(ROUTE_WITH_VALID_ID)
        .send(mocks.motorcycle)
        .expect(status.NOT_FOUND)
        .expect({ message: motorcycleNotFound });
    });
  
    it(INVALID_ID_DESCRIPTION, async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
  
      await request(app)
        .put(ROUTE_WITH_INVALID_ID)
        .send(mocks.motorcycle)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });

  describe('DELETE /motorcycles/:id', function () {
    afterEach(function () {
      Sinon.restore();
    });
  
    it('should be able to delete a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(mocks.motorcycleList[0]);
  
      await request(app)
        .delete(ROUTE_WITH_VALID_ID)
        .expect(status.NO_CONTENT);
    });
  
    it(MOTORCYCLE_NOT_FOUND_DESCRIPTION, async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
      await request(app)
        .delete(ROUTE_WITH_VALID_ID)
        .send(mocks.motorcycle)
        .expect(status.NOT_FOUND)
        .expect({ message: motorcycleNotFound });
    });
  
    it(INVALID_ID_DESCRIPTION, async function () {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(null);
  
      await request(app)
        .delete(ROUTE_WITH_INVALID_ID)
        .send(mocks.motorcycle)
        .expect(status.UNPROCESSABLE_CONTENT)
        .expect({ message: invalidId });
    });
  });
});
