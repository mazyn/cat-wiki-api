import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { map, take } from 'rxjs';

import { GetMostSearchedDto } from 'domain/dtos/breed';
import { IBreedService, ICatApiService } from 'domain/services';
import { NotFoundError } from 'application/errors';

@Injectable()
export class BreedUseCases {
  private readonly logger = new Logger(BreedUseCases.name);

  constructor(
    private readonly breedService: IBreedService,
    private readonly catApiService: ICatApiService,
  ) {}

  async getMostSearched() {
    this.logger.log('Received request to fetch most searched breeds');

    const breeds = await this.breedService.getMany({
      orderBy: {
        searchCount: 'asc',
      },
      take: 10,
    });

    return this.catApiService.getBreeds().pipe(
      map((r) => {
        return r
          .slice()
          .sort((a, b) => {
            if (breeds?.length <= 0) return 1;

            const aBreed = breeds.find((x) => x.externalId === a.id);
            const bBreed = breeds.find((x) => x.externalId === b.id);

            return breeds.indexOf(bBreed) - breeds.indexOf(aBreed);
          })
          .slice(0, 10)
          .map((b) => new GetMostSearchedDto(b));
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
          const catApiBreed = breeds.find((b) => b.id === catApiId);

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
