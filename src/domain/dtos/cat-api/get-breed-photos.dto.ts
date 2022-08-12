import { ApiProperty } from '@nestjs/swagger';
import { CatApiPhotoModel } from 'domain/models/cat-api-photo.model';
import { GetBreedDto } from './get-breed.dto';

export class GetBreedPhotosDto extends GetBreedDto {
  @ApiProperty({
    description: 'A list of photos URLs of the breed',
    example: ['https://cdn2.thecatapi.com/images/EHG3sOpAM.jpg'],
  })
  photos: string[] = undefined;

  constructor(partial: Partial<CatApiPhotoModel[]>) {
    super(partial[0]?.breeds[0]);

    this.photos = partial?.map((p) => p?.url);
  }
}
