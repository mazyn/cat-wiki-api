import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { camelizeKeys } from 'humps';
import { catchError, map, Observable, take } from 'rxjs';

import { GetBreedDto } from '../../domain/dtos/cat-api/get-breed.dto';
import { GetBreedPhotoDto } from '../../domain/dtos/cat-api/get-breed-photo.dto';
import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { handleAxiosError } from 'application/shared/utils';

@Injectable()
export class CatApiService extends ICatApiService {
  public constructor(protected readonly httpService: HttpService) {
    super(httpService);
  }

  getBreeds(): Observable<GetBreedDto[]> {
    return this.httpService.get('breeds').pipe(
      take(1),
      catchError((e) => handleAxiosError(e)),
      map((r) => camelizeKeys(r.data) as GetBreedDto[]),
    );
  }

  getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<GetBreedPhotoDto[]> {
    return this.httpService
      .get('images/search', {
        params: { breed_id: externalId, limit },
      })
      .pipe(
        take(1),
        catchError((e) => handleAxiosError(e)),
        map((r) => camelizeKeys(r.data) as GetBreedPhotoDto[]),
      );
  }
}
