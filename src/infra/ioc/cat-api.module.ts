import { Module } from '@nestjs/common';

import { HttpModule } from '../rest/http.module';
import { ICatApiService } from '../../domain/services';
import { CatApiService } from '../services';
import { CatApiController } from '../../application/controllers';
import { CatApiUseCases } from '../../application/use-cases';

@Module({
  imports: [HttpModule],
  controllers: [CatApiController],
  providers: [
    { provide: ICatApiService, useClass: CatApiService },
    CatApiUseCases,
  ],
  exports: [ICatApiService],
})
export class CatApiModule {}
