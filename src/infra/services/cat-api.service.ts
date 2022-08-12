import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { camelizeKeys } from 'humps';
import { catchError, map, Observable, take } from 'rxjs';

import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { handleAxiosError } from 'application/shared/utils';
import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';
import { CatApiPhotoModel } from 'domain/models/cat-api-photo.model';

@Injectable()
export class CatApiService extends ICatApiService {
  public constructor(protected readonly httpService: HttpService) {
    super(httpService);
  }

  getBreeds(): Observable<CatApiBreedModel[]> {
    return this.httpService.get('breeds').pipe(
      take(1),
      catchError((e) => handleAxiosError(e)),
      map((r) => camelizeKeys(r.data) as CatApiBreedModel[]),
    );
  }

  getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<CatApiPhotoModel[]> {
    return this.httpService
      .get('images/search', {
        params: { breed_id: externalId, limit },
      })
      .pipe(
        take(1),
        catchError((e) => handleAxiosError(e)),
        map((r) => camelizeKeys(r.data) as CatApiPhotoModel[]),
      );
  }
}
