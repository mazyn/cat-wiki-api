import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InternalServerError {
  @ApiProperty({
    description: 'The error status',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The error message',
    example: 'Something went wrong while executing <some action>...',
  })
  message: string;

  @ApiProperty({
    description: 'The time of the executed error',
    example: new Date(),
  })
  timestamp: Date;

  constructor(message?: string) {
    this.statusCode = HttpStatus.NOT_FOUND;
    this.timestamp = new Date();
    this.message = message;
  }
}
