import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import { GetBreedDto } from '../../domain/dtos/breeds/get-breed.dto';
import { GetBreedPhotoDto } from '../../domain/dtos/breeds/get-breed-photo.dto';
import { ICatApiService } from '../../domain/services/cat-api.service.interface';

@Injectable()
export class CatApiService extends ICatApiService {
  public constructor(protected readonly httpService: HttpService) {
    super(httpService);
  }

  getBreeds(): Observable<AxiosResponse<GetBreedDto[]>> {
    return this.httpService.get('breeds');
  }

  getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<AxiosResponse<GetBreedPhotoDto[]>> {
    return this.httpService.get('images/search', {
      params: { breed_id: externalId, limit },
    });
  }
}
