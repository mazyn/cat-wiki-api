import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export abstract class IPrismaService extends PrismaClient {
  abstract onModuleInit(): Promise<void>;

  abstract enableShutdownHooks(app: INestApplication): Promise<void>;
}
