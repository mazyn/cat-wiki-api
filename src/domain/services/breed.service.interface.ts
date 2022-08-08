import { Breed, Prisma } from '@prisma/client';
import { GetManyParams } from '.';

import { IBaseService } from './base.service.interface';

export abstract class IBreedService extends IBaseService<Breed> {
  abstract override get(
    whereUniqueInput: Prisma.BreedWhereUniqueInput,
  ): Promise<Breed>;

  abstract override getMany(
    params: GetManyParams<
      Prisma.BreedWhereUniqueInput,
      Prisma.BreedWhereInput,
      Prisma.BreedOrderByWithRelationInput
    >,
  ): Promise<Breed[]>;

  abstract override insert(data: Prisma.BreedCreateInput): Promise<Breed>;

  abstract override update(params: {
    whereUniqueInput: Prisma.BreedWhereUniqueInput;
    updateInput: Prisma.BreedUpdateInput;
  }): Promise<Breed>;

  abstract override delete(
    whereUniqueInput: Prisma.BreedWhereUniqueInput,
  ): Promise<Breed>;
}
