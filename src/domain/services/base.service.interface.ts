import { Injectable } from '@nestjs/common';

import { IPrismaService } from 'domain/db/prisma.service.interface';

export interface GetManyParams<C, W, O> {
  skip?: number;
  take?: number;
  cursor?: C;
  where?: W;
  orderBy?: O;
}

@Injectable()
export abstract class IBaseService<Entity> {
  constructor(protected readonly prisma: IPrismaService) {}

  abstract get<T>(whereUniqueInput: T): Promise<Entity | null>;

  abstract getMany<C, W, O>(params: GetManyParams<C, W, O>): Promise<Entity[]>;

  abstract insert(data: object): Promise<Entity>;

  abstract update<W, U>(params: {
    whereUniqueInput: W;
    updateInput: U;
  }): Promise<Entity>;

  abstract delete<T>(whereUniqueInput: T): Promise<Entity>;
}
