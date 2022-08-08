import { ApiProperty } from '@nestjs/swagger';
import { Breed } from '@prisma/client';

export class GetMostSearchedDto {
  @ApiProperty({
    description: 'The breed UUID',
    example: '0a238fc7-1391-48cd-aede-34522f37f3ef',
  })
  id: string;
  @ApiProperty({
    description: "The breed's name",
    example: 'Savannah',
  })
  name: string;
  @ApiProperty({
    description: "The breed's ID from the Cat API",
    example: 'sava',
  })
  externalId: string;

  constructor(partial?: Partial<Breed>) {
    this.id = partial?.id;
    this.name = partial?.name;
    this.externalId = partial?.externalId;
  }
}
