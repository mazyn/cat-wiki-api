import { ApiProperty } from '@nestjs/swagger';

export class GetBreedDto {
  @ApiProperty({
    description: 'The breed ID',
    example: 'abys',
  })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  temperament: string;
  @ApiProperty()
  lifeSpan: string;
  @ApiProperty()
  altNames: string;
  @ApiProperty()
  wikipediaUrl: string;
  @ApiProperty()
  origin: string;
  @ApiProperty()
  weightImperial: string;
  @ApiProperty()
  experimental: number;
  @ApiProperty()
  hairless: number;
  @ApiProperty()
  natural: number;
  @ApiProperty()
  rare: number;
  @ApiProperty()
  rex: number;
  @ApiProperty()
  suppressTail: number;
  @ApiProperty()
  shortLegs: number;
  @ApiProperty()
  hypoallergenic: number;
  @ApiProperty()
  adaptability: number;
  @ApiProperty()
  affectionLevel: number;
  @ApiProperty()
  countryCode: string;
  @ApiProperty()
  childFriendly: number;
  @ApiProperty()
  dogFriendly: number;
  @ApiProperty()
  energyLevel: number;
  @ApiProperty()
  grooming: number;
  @ApiProperty()
  healthIssues: number;
  @ApiProperty()
  intelligence: number;
  @ApiProperty()
  sheddingLevel: number;
  @ApiProperty()
  socialNeeds: number;
  @ApiProperty()
  strangerFriendly: number;
  @ApiProperty()
  vocalisation: number;
}
