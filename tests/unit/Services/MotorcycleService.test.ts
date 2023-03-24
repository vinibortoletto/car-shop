import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { Motorcycle } from '../../../src/Domains';
import { IMotorcycle } from '../../../src/Interfaces';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycle, motorcycleList } from '../../mocks/motorcyclesMocks';

describe('Unit tests for "MotorcycleService" class', function () {
  const service = new MotorcycleService();

  afterEach(function () {
    Sinon.restore();
  });

  describe('"create" method', function () {
    it('should be able to create a new motorcycle', async function () {
      const output: IMotorcycle = { ...motorcycleList[0], status: true };
      const input: IMotorcycle = motorcycle;
      Sinon.stub(Model, 'create').resolves(output);
  
      const result: Motorcycle | null = await service.create(input);
      expect(result).to.deep.equal(output);
    });
  });
});
