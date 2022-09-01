import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { Breed } from '@prisma/client';
import _ from 'lodash';
import { firstValueFrom, of } from 'rxjs';

import { CatApiBreedModel } from '../../domain/models/cat-api-breed.model';
import { IBreedService, ICatApiService } from '../../domain/services';
import { PrismaModule } from '../../infra/ioc';
import { BreedService, CatApiService } from '../../infra/services';
import { BreedUseCases } from './breed.use-cases';

describe('BreedUseCases', () => {
  let useCases: BreedUseCases;
  let catApiService: ICatApiService;
  let breedService: IBreedService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, PrismaModule],
      providers: [
        { provide: ICatApiService, useClass: CatApiService },
        { provide: IBreedService, useClass: BreedService },
        BreedUseCases,
      ],
    }).compile();

    useCases = moduleRef.get<BreedUseCases>(BreedUseCases);
    catApiService = moduleRef.get<ICatApiService>(ICatApiService);
    breedService = moduleRef.get<IBreedService>(IBreedService);
  });

  describe('getMostSearched', () => {
    it('should return an array of most searched breeds', async () => {
      const mockBreeds: Breed[] = [
        {
          id: 'foo',
          externalId: 'sava',
          name: 'Savannah',
          searchCount: 1,
        },
        {
          id: 'bar',
          externalId: 'mcoo',
          name: 'Maine Coon',
          searchCount: 2,
        },
      ];
      const mockCatApiBreedModels: Partial<CatApiBreedModel>[] = [
        {
          id: 'sava',
          name: 'Savannah',
        },
        {
          id: 'mcoo',
          name: 'Maine Coon',
        },
      ];

      jest
        .spyOn(breedService, 'getMany')
        .mockImplementation(() => Promise.resolve(mockBreeds));
      jest
        .spyOn(catApiService, 'getBreeds')
        .mockImplementation(() =>
          of(mockCatApiBreedModels as CatApiBreedModel[]),
        );

      const result = await firstValueFrom(await useCases.getMostSearched());

      expect(result.length).toBe(2);

      expect(result[0].externalId).toBe('mcoo');
      expect(result[0].name).toBe('Maine Coon');

      expect(result[1].externalId).toBe('sava');
      expect(result[1].name).toBe('Savannah');
    });
  });

  describe('increaseSearchCount', () => {
    it('should update search count and return success if breed exists in database', async () => {
      const mockBreed: Breed = {
        id: 'bar',
        externalId: 'mcoo',
        name: 'Maine Coon',
        searchCount: 2,
      };

      jest.spyOn(breedService, 'get').mockImplementation(
        ({ externalId }) =>
          new Promise((res) => {
            res(_.find([mockBreed], (b) => b.externalId === externalId));
          }),
      );
      jest
        .spyOn(breedService, 'update')
        .mockImplementation(() =>
          Promise.resolve({ ...mockBreed, searchCount: 3 }),
        );

      expect(await useCases.increaseSearchCount('mcoo')).toBeUndefined();
      expect(breedService.get).toHaveBeenCalledTimes(1);
      expect(breedService.update).toHaveBeenCalledTimes(1);
    });

    it('should insert new breed entity with search count equals 1 and return success if breed does not exists in database', async () => {
      const mockBreed: Breed = {
        id: 'bar',
        externalId: 'mcoo',
        name: 'Maine Coon',
        searchCount: 1,
      };
      const mockCatApiBreedModels: Partial<CatApiBreedModel>[] = [
        {
          id: 'sava',
          name: 'Savannah',
        },
        {
          id: 'mcoo',
          name: 'Maine Coon',
        },
      ];

      jest
        .spyOn(breedService, 'get')
        .mockImplementation(() => Promise.resolve(undefined));
      jest
        .spyOn(breedService, 'insert')
        .mockImplementation(() => Promise.resolve(mockBreed));
      jest
        .spyOn(catApiService, 'getBreeds')
        .mockImplementation(() =>
          of(mockCatApiBreedModels as CatApiBreedModel[]),
        );

      expect(await useCases.increaseSearchCount('mcoo')).toBeUndefined();
      expect(breedService.get).toHaveBeenCalledTimes(1);
      expect(breedService.insert).toHaveBeenCalledTimes(1);
      expect(catApiService.getBreeds).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if breed does not exists', async () => {
      jest
        .spyOn(breedService, 'get')
        .mockImplementation(() => Promise.resolve(undefined));
      jest.spyOn(catApiService, 'getBreeds').mockImplementation(() => of([]));

      expect(useCases.increaseSearchCount('i-dont-exist')).rejects.toThrowError(
        'Something went wrong while updating the search count',
      );
    });
  });
});
