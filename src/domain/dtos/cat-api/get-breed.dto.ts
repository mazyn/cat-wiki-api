import { ApiProperty } from '@nestjs/swagger';
import { CatApiBreedModel } from 'domain/models/cat-api-breed.model';

export class GetBreedDto {
  @ApiProperty({
    description: 'The breed ID',
    example: 'abys',
  })
  externalId: string = undefined;

  @ApiProperty({
    description: 'The breed name',
    example: 'Abyssinian',
  })
  name: string = undefined;

  @ApiProperty({
    description: "The link to the breed's article on CFA",
    example: 'http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx',
  })
  cfaUrl: string = undefined;

  @ApiProperty({
    description: "Information about the cat's temperament",
    example: 'Active, Energetic, Independent, Intelligent, Gentle',
  })
  temperament: string = undefined;

  @ApiProperty({
    description: 'Where the breed comes from',
    example: 'Egypt',
  })
  origin: string = undefined;

  @ApiProperty({
    description: 'A short description about the breed',
    example:
      'The Abyssinian is easy to care for, and a joy to have in your home. ' +
      'They’re affectionate cats and love both people and other animals',
  })
  description: string = undefined;

  @ApiProperty({
    description: "The breed's life span",
    example: '14 - 15',
  })
  lifeSpan: string = undefined;

  @ApiProperty({
    description: "The cat's level of adaptability, ranging from 1 to 5",
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  adaptability: number = undefined;

  @ApiProperty({
    description: "The cat's affection level, ranging from 1 to 5",
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  affectionLevel: number = undefined;

  @ApiProperty({
    description: "The cat's child-friendly level, ranging from 1 to 5",
    example: 4,
    enum: [1, 2, 3, 4, 5],
  })
  childFriendly: number = undefined;

  @ApiProperty({
    description: "The cat's grooming level, ranging from 1 to 5",
    example: 1,
    enum: [1, 2, 3, 4, 5],
  })
  grooming: number = undefined;

  @ApiProperty({
    description: "The cat's intelligence level, ranging from 1 to 5",
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  intelligence: number = undefined;

  @ApiProperty({
    description: "The cat's health issues level, ranging from 1 to 5",
    example: 3,
    enum: [1, 2, 3, 4, 5],
  })
  healthIssues: number = undefined;

  @ApiProperty({
    description: "The cat's social needs level, ranging from 1 to 5",
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  socialNeeds: number = undefined;

  @ApiProperty({
    description: "The cat's stranger-friendly level, ranging from 1 to 5",
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  @ApiProperty()
  strangerFriendly: number = undefined;

  constructor(partial: Partial<CatApiBreedModel>) {
    Object.keys(this).forEach((key) => {
      if (key in partial) this[key] = partial[key];
    });

    this.externalId = partial?.id;
  }
}
