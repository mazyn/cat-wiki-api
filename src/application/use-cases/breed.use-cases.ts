import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { map, take } from 'rxjs';
import _ from 'lodash';

import { GetMostSearchedDto } from 'domain/dtos/breed';
import { IBreedService, ICatApiService } from 'domain/services';
import { NotFoundError } from 'application/errors';
import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';

@Injectable()
export class BreedUseCases {
  private readonly logger = new Logger(BreedUseCases.name);

  constructor(
    private readonly breedService: IBreedService,
    private readonly catApiService: ICatApiService,
  ) {}

  async getMostSearched() {
    this.logger.log('Received request to fetch most searched breeds');

    const dbBreeds = await this.breedService.getMany({
      orderBy: {
        searchCount: 'desc',
      },
      take: 10,
    });

    return this.catApiService.getBreeds().pipe(
      map((r) => {
        let apiBreeds: CatApiBreedModel[] | GetMostSearchedDto[] = _.map(
          r,
          (b) => {
            b['searchCount'] =
              _.find(dbBreeds, (x) => x.externalId === b.id)?.searchCount ?? 0;
            return b;
          },
        );

        apiBreeds = _.orderBy(
          apiBreeds,
          ['searchCount', 'name'],
          ['desc', 'asc'],
        );

        apiBreeds = _.slice(apiBreeds, 0, 10);

        apiBreeds = _.map(apiBreeds, (b) => new GetMostSearchedDto(b));

        return apiBreeds;
      }),
    );
  }

  async increaseSearchCount(catApiId: string) {
    this.logger.log(
      `Received request to increase search count for breed ID: ${catApiId}`,
    );

    const breed = await this.breedService.get({
      externalId: catApiId,
    });

    try {
      if (breed) {
        breed.searchCount++;

        await this.breedService.update({
          updateInput: breed,
          whereUniqueInput: {
            externalId: catApiId,
          },
        });

        this.logger.log('Breed search count updated successfully');

        return;
      }

      this.catApiService
        .getBreeds()
        .pipe(take(1))
        .subscribe((breeds) => {
          const catApiBreed = _.find(breeds, (b) => b.id === catApiId);

          if (!catApiBreed)
            throw new NotFoundError(
              `Couldn't find cat breed for given ID: ${catApiId}`,
            );

          this.breedService.insert({
            name: catApiBreed.name,
            externalId: catApiBreed.id,
            searchCount: 1,
          });

          this.logger.log('Breed search count updated successfully');
        });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Something went wrong while updating the search count',
      );
    }
  }
}
