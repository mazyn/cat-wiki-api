import { Test } from '@nestjs/testing';
import { Breed, Prisma } from '@prisma/client';

import { PrismaModule } from '../../infra/ioc';
import { IBreedService } from '../../domain/services';
import { BreedService } from './breed.service';

const mockBreed: Breed = {
  id: 'sava',
  name: 'Savannah',
  searchCount: 10,
  externalId: 'sava',
};

describe('BreedService', () => {
  let provider: IBreedService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [{ provide: IBreedService, useClass: BreedService }],
    }).compile();

    provider = moduleRef.get<IBreedService>(IBreedService);
  });

  describe('get', () => {
    it('should return a breed entity', async () => {
      const result: Breed = mockBreed;

      jest
        .spyOn(provider, 'get')
        .mockImplementation(() => Promise.resolve(mockBreed));

      expect(await provider.get({ externalId: 'sava' })).toBe(result);
    });
  });

  describe('getMany', () => {
    it('should return an array of breed entities', async () => {
      const result: Breed[] = [mockBreed];

      jest
        .spyOn(provider, 'getMany')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await provider.getMany({
          where: { externalId: 'sava' },
        }),
      ).toBe(result);
    });
  });

  describe('insert', () => {
    it('should create a new breed entity', async () => {
      const data: Prisma.BreedCreateInput = {
        name: 'Foo',
        externalId: 'fb',
      };
      const result: Breed = {
        id: 'string',
        name: 'Foo',
        externalId: 'fb',
        searchCount: 0,
      };

      jest
        .spyOn(provider, 'insert')
        .mockImplementation(() => Promise.resolve(result));

      expect(await provider.insert(data)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a breed entity', async () => {
      const where: Prisma.BreedWhereUniqueInput = {
        externalId: 'fb',
      };
      const data: Prisma.BreedUpdateInput = {
        name: 'Bar',
      };
      const result: Breed = {
        id: 'string',
        name: 'Bar',
        externalId: 'fb',
        searchCount: 0,
      };

      jest
        .spyOn(provider, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await provider.update({
          whereUniqueInput: where,
          updateInput: data,
        }),
      ).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a breed entity', async () => {
      const where: Prisma.BreedWhereUniqueInput = {
        externalId: 'fb',
      };
      const result: Breed = {
        id: 'string',
        name: 'Bar',
        externalId: 'fb',
        searchCount: 0,
      };

      jest
        .spyOn(provider, 'delete')
        .mockImplementation(() => Promise.resolve(result));

      expect(await provider.delete(where)).toBe(result);
    });
  });
});
