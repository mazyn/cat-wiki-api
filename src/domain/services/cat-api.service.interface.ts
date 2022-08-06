import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { GetBreedDto } from '../dtos/breeds/get-breed.dto';
import { GetBreedPhotoDto } from '../dtos/breeds/get-breed-photo.dto';

export abstract class ICatApiService {
  protected constructor(protected readonly httpService: HttpService) {}

  abstract getBreeds(): Observable<AxiosResponse<GetBreedDto[]>>;

  abstract getBreedPhotos(
    externalId: string,
    limit: number,
  ): Observable<AxiosResponse<GetBreedPhotoDto[]>>;
}
