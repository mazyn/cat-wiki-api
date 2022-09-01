import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { CatApiBreedModel } from '../../domain/models/cat-api-breed.model';
import { CatApiPhotoModel } from '../../domain/models/cat-api-photo.model';
import { ICatApiService } from '../../domain/services';
import { CatApiService } from '../../infra/services';
import { CatApiUseCases } from './cat-api.use-cases';

describe('CatApiUseCases', () => {
  let useCases: CatApiUseCases;
  let catApiService: ICatApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: ICatApiService, useClass: CatApiService },
        CatApiUseCases,
      ],
    }).compile();

    useCases = moduleRef.get<CatApiUseCases>(CatApiUseCases);
    catApiService = moduleRef.get<ICatApiService>(ICatApiService);
  });

  describe('getBreeds', () => {
    it('should return an array of breeds', async () => {
      const mockBreeds: Partial<CatApiBreedModel>[] = [
        { id: 'sava', name: 'Savannah' },
        { id: 'mcoo', name: 'Maine Coon' },
      ];

      jest
        .spyOn(catApiService, 'getBreeds')
        .mockImplementation(() => of(mockBreeds as CatApiBreedModel[]));

      const result = await lastValueFrom(useCases.getBreeds());

      expect(result.length).toBe(2);

      expect(result[0].externalId).toBe('sava');
      expect(result[0].name).toBe('Savannah');

      expect(result[1].externalId).toBe('mcoo');
      expect(result[1].name).toBe('Maine Coon');
    });
  });

  describe('getBreedPhotos', () => {
    it('should return an array of breed photos', async () => {
      const mockBreeds: Partial<CatApiPhotoModel>[] = [
        {
          breeds: [{ id: 'mcoo', name: 'Maine Coon' } as CatApiBreedModel],
          id: 'mcoo',
          url: 'mcoo.jpeg',
        },
        {
          breeds: [{ id: 'mcoo', name: 'Maine Coon' } as CatApiBreedModel],
          id: 'mcoo2',
          url: 'mcoo2.jpeg',
        },
      ];

      jest
        .spyOn(catApiService, 'getBreedPhotos')
        .mockImplementation(() => of(mockBreeds as CatApiPhotoModel[]));

      const result = await lastValueFrom(useCases.getBreedPhotos('mcoo', 2));

      expect(result.externalId).toBe('mcoo');
      expect(result.name).toBe('Maine Coon');

      expect(result.photos.length).toBe(2);
      expect(result.photos[0]).toBe('mcoo.jpeg');
      expect(result.photos[1]).toBe('mcoo2.jpeg');
    });
  });
});
