import { Module } from '@nestjs/common';

import { IPrismaService } from '../../domain/db/prisma.service.interface';
import { PrismaService } from '../db/prisma.service';

@Module({
  providers: [{ provide: IPrismaService, useClass: PrismaService }],
  exports: [IPrismaService],
})
export class PrismaModule {}
