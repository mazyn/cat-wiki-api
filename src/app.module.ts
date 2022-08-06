import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { setEnvironment } from './infra/environments';
import { CatApiModule } from './infra/ioc/cat-api.module';
import { PrismaModule } from './infra/ioc/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    PrismaModule,
    CatApiModule,
  ],
})
export class AppModule {}
