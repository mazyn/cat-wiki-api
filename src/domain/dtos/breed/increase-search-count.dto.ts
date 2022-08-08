import { ApiProperty } from '@nestjs/swagger';

export class IncreaseSearchCountDtoRequest {
  @ApiProperty({
    description: 'The breed ID from the Cat API',
    required: true,
    example: 'abys',
  })
  externalId: string;
}
