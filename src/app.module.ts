import { Module } from '@nestjs/common';

import { CatApiModule } from './infra/ioc/cat-api.module';

@Module({
  imports: [CatApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
