import { Injectable, Logger } from '@nestjs/common';
import pluralize from 'pluralize';
import { Observable } from 'rxjs';

import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { GetBreedDto } from '../../domain/dtos/cat-api/get-breed.dto';
import { GetBreedPhotoDto } from '../../domain/dtos/cat-api/get-breed-photo.dto';

@Injectable()
export class CatApiUseCases {
  private readonly logger = new Logger(CatApiUseCases.name);

  constructor(private readonly catApiService: ICatApiService) {}

  getBreeds(): Observable<GetBreedDto[]> {
    this.logger.log('Received request to fetch all breeds');

    return this.catApiService.getBreeds();
  }

  getBreedPhotos(breedId: string, limit = 1): Observable<GetBreedPhotoDto[]> {
    this.logger.log(
      `Received request to fetch ${pluralize(
        'photo',
        limit,
        true,
      )} for breed ID: ${breedId}`,
    );

    return this.catApiService.getBreedPhotos(breedId, limit);
  }
}
