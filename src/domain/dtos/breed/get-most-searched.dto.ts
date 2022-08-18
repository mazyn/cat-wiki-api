import { ApiProperty } from '@nestjs/swagger';
import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';

export class GetMostSearchedDto {
  @ApiProperty({
    description: "The breed's name",
    example: 'Savannah',
  })
  name: string;

  @ApiProperty({
    description: 'A description of the cat breed',
    example:
      'Savannah is the feline version of a dog. Actively seeking social interaction, they are given to pouting if left out. Remaining kitten-like through life. Profoundly loyal to immediate family members whilst questioning the presence of strangers. Making excellent companions that are loyal, intelligent and eager to be involved.',
  })
  description: string;

  @ApiProperty({
    description: "The breed's ID from the Cat API",
    example: 'sava',
  })
  externalId: string;

  @ApiProperty({
    description: 'A link to a photo of the cat breed',
    example: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  })
  imageUrl: string;

  constructor(partial?: Partial<CatApiBreedModel>) {
    this.name = partial?.name;
    this.description = partial?.description;
    this.externalId = partial?.id;
    this.imageUrl = partial?.image?.url;
  }
}
