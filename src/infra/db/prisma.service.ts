import { INestApplication, Injectable } from '@nestjs/common';

import { IPrismaService } from '../../domain/db/prisma.service.interface';

@Injectable()
export class PrismaService extends IPrismaService {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
