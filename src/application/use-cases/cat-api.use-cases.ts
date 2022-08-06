import { Injectable, Logger } from '@nestjs/common';
import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { GetBreedDto } from '../../domain/dtos/breeds/get-breed.dto';
import { catchError, map, Observable, take } from 'rxjs';
import { camelizeKeys } from 'humps';
import { GetBreedPhotoDto } from '../../domain/dtos/breeds/get-breed-photo.dto';
import pluralize from 'pluralize';
import { handleAxiosError } from '../shared/utils';

@Injectable()
export class CatApiUseCases {
  private readonly logger = new Logger(CatApiUseCases.name);

  constructor(private readonly catApiService: ICatApiService) {}

  getBreeds(): Observable<GetBreedDto[]> {
    this.logger.log('Received request to fetch all breeds');

    return this.catApiService.getBreeds().pipe(
      take(1),
      catchError((e) => handleAxiosError(e)),
      map((r) => camelizeKeys(r.data) as GetBreedDto[]),
    );
  }

  getBreedPhotos(
    breedId: string,
    limit: number = 1,
  ): Observable<GetBreedPhotoDto[]> {
    this.logger.log(
      `Received request to fetch ${pluralize(
        'photo',
        limit,
        true,
      )} for breed ID: ${breedId}`,
    );

    return this.catApiService.getBreedPhotos(breedId, limit).pipe(
      take(1),
      catchError((e) => handleAxiosError(e)),
      map((r) => camelizeKeys(r.data) as GetBreedPhotoDto[]),
    );
  }
}
