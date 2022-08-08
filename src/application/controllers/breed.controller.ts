import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { NotFoundError } from 'application/errors/not-found.error';
import { BreedUseCases } from 'application/use-cases';
import { GetMostSearchedDto } from 'domain/dtos/breed';
import { IncreaseSearchCountDtoRequest } from 'domain/dtos/breed/increase-search-count.dto';

@ApiTags('Breeds')
@Controller('breed')
export class BreedController {
  constructor(private readonly breedUseCases: BreedUseCases) {}

  @Get('most-searched')
  @ApiOperation({
    summary: 'Returns a list of the 10 most searched cat breeds',
  })
  @ApiOkResponse({
    description: 'A list of the 10 most searched cat breeds',
    type: GetMostSearchedDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Breeds not found', type: NotFoundError })
  getMostSearched() {
    return this.breedUseCases.getMostSearched();
  }

  @Patch('searched')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Increases the search count of given cat breed by 1',
  })
  @ApiNoContentResponse({
    description: "Successfully upated the breed's search count",
  })
  @ApiNotFoundResponse({
    description: "Couldn't find cat breed for given ID: <externalId>",
    type: NotFoundError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the search count',
    type: InternalServerErrorException,
  })
  increaseSearchCount(@Body() { externalId }: IncreaseSearchCountDtoRequest) {
    this.breedUseCases.increaseSearchCount(externalId);
  }
}
