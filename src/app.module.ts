import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { setEnvironment } from './infra/environments';
import { BreedModule, CatApiModule, PrismaModule } from 'infra/ioc';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    PrismaModule,
    BreedModule,
    CatApiModule,
  ],
})
export class AppModule {}
