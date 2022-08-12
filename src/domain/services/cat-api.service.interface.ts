import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';
import { CatApiPhotoModel } from 'domain/models/cat-api-photo.model';

export abstract class ICatApiService {
  protected constructor(protected readonly httpService: HttpService) {}

  abstract getBreeds(): Observable<CatApiBreedModel[]>;

  abstract getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<CatApiPhotoModel[]>;
}
