import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

import { GetBreedDto } from '../dtos/cat-api/get-breed.dto';
import { GetBreedPhotoDto } from '../dtos/cat-api/get-breed-photo.dto';

export abstract class ICatApiService {
  protected constructor(protected readonly httpService: HttpService) {}

  abstract getBreeds(): Observable<GetBreedDto[]>;

  abstract getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<GetBreedPhotoDto[]>;
}
