import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { CatApiUseCases } from '../use-cases/cat-api.use-cases';
import { GetBreedDto } from '../../domain/dtos/cat-api/get-breed.dto';
import { GetBreedPhotosDto } from '../../domain/dtos/cat-api/get-breed-photos.dto';
import { NotFoundError } from '../errors';

@ApiTags('Cat API')
@Controller('cat-api')
export class CatApiController {
  constructor(private readonly catApiUseCases: CatApiUseCases) {}

  @Get('breeds')
  @ApiOperation({ summary: 'Return a list of cat breeds' })
  @ApiOkResponse({
    description: 'All breeds fetched',
    type: GetBreedDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Breeds not found', type: NotFoundError })
  getBreeds(): Observable<GetBreedDto[]> {
    return this.catApiUseCases.getBreeds();
  }

  @Get('breed-photos')
  @ApiOperation({ summary: 'Return a list of photos for the selected breed' })
  @ApiQuery({
    name: 'b',
    type: String,
    description: 'The breed ID',
    example: 'abys',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'The amount of photos to retrieve',
    example: 1,
    allowEmptyValue: true,
    required: false,
  })
  @ApiOkResponse({
    description: 'All photos fetched',
    type: GetBreedPhotosDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Breed photos not found',
    type: NotFoundError,
  })
  getBreedPhotos(
    @Query('b') breedId: string,
    @Query('limit') limit: number,
  ): Observable<GetBreedPhotosDto> {
    return this.catApiUseCases.getBreedPhotos(breedId, limit);
  }
}
