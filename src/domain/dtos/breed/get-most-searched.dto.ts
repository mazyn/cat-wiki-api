import { Breed } from '@prisma/client';

export class GetMostSearchedDto {
  id: string;
  name: string;
  externalId: string;

  constructor(partial?: Partial<Breed>) {
    this.id = partial?.id;
    this.name = partial?.name;
    this.externalId = partial?.externalId;
  }
}
