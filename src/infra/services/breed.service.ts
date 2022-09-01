import { Injectable } from '@nestjs/common';
import { Breed, Prisma } from '@prisma/client';

import { IPrismaService } from '../../domain/db/prisma.service.interface';
import { IBreedService, GetManyParams } from '../../domain/services';

@Injectable()
export class BreedService extends IBreedService {
  constructor(prisma: IPrismaService) {
    super(prisma);
  }

  async get(whereUniqueInput: Prisma.BreedWhereUniqueInput): Promise<Breed> {
    return this.prisma.breed.findUnique({ where: whereUniqueInput });
  }

  async getMany(
    params: GetManyParams<
      Prisma.BreedWhereUniqueInput,
      Prisma.BreedWhereInput,
      Prisma.BreedOrderByWithRelationInput
    >,
  ): Promise<Breed[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.breed.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async insert(data: Prisma.BreedCreateInput): Promise<Breed> {
    return this.prisma.breed.create({ data });
  }

  async update(params: {
    whereUniqueInput: Prisma.BreedWhereUniqueInput;
    updateInput: Prisma.BreedUpdateInput;
  }): Promise<Breed> {
    const { whereUniqueInput, updateInput: updateInt } = params;
    return this.prisma.breed.update({
      where: whereUniqueInput,
      data: updateInt,
    });
  }

  async delete(whereUniqueInput: Prisma.BreedWhereUniqueInput): Promise<Breed> {
    return this.prisma.breed.delete({
      where: whereUniqueInput,
    });
  }
}
