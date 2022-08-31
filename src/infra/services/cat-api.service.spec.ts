import { Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';
import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { CatApiService } from './cat-api.service';
import { HttpModule } from '@nestjs/axios';
import { CatApiPhotoModel } from 'domain/models/cat-api-photo.model';

const mockCatApiBreedModel: CatApiBreedModel = {
  weight: {
    imperial: 'string',
    metric: 'string',
  },
  id: 'string',
  name: 'string',
  cfaUrl: 'string',
  vetstreetUrl: 'string',
  vcahospitalsUrl: 'string',
  temperament: 'string',
  origin: 'string',
  countryCodes: 'string',
  countryCode: 'string',
  description: 'string',
  lifeSpan: 'string',
  indoor: 0,
  lap: 0,
  altNames: 'string',
  adaptability: 0,
  affectionLevel: 0,
  childFriendly: 0,
  dogFriendly: 0,
  energyLevel: 0,
  grooming: 0,
  healthIssues: 0,
  intelligence: 0,
  sheddingLevel: 0,
  socialNeeds: 0,
  strangerFriendly: 0,
  vocalisation: 0,
  experimental: 0,
  hairless: 0,
  natural: 0,
  rare: 0,
  rex: 0,
  suppressedTail: 0,
  shortLegs: 0,
  wikipediaUrl: 'string',
  hypoallergenic: 0,
  referenceImageId: 'string',
  image: {
    id: 'string',
    width: 0,
    height: 0,
    url: 'string',
  },
};

const mockCatApiPhotoModel = {
  breeds: [mockCatApiBreedModel],
  id: 'string',
  url: 'string',
  width: 0,
  height: 0,
};

describe('CatApiService', () => {
  let provider: ICatApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [{ provide: ICatApiService, useClass: CatApiService }],
    }).compile();

    provider = moduleRef.get<ICatApiService>(ICatApiService);
  });

  describe('getBreeds', () => {
    it('should return an array of cat breeds', async () => {
      const result: Observable<CatApiBreedModel[]> = of([mockCatApiBreedModel]);

      jest.spyOn(provider, 'getBreeds').mockImplementation(() => result);

      expect(provider.getBreeds()).toBe(result);
    });
  });

  describe('getBreedPhotos', () => {
    it('should return an array of photos of the breed', async () => {
      const externalId = mockCatApiPhotoModel.id;
      const result: Observable<CatApiPhotoModel[]> = of([mockCatApiPhotoModel]);

      jest.spyOn(provider, 'getBreedPhotos').mockImplementation(() => result);

      expect(provider.getBreedPhotos(externalId, 1)).toBe(result);
    });
  });
});
