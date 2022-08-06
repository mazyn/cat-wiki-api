import { Module } from '@nestjs/common';

import { HttpModule } from '../rest/http.module';
import { ICatApiService } from '../../domain/services/cat-api.service.interface';
import { CatApiService } from '../services/cat-api.service';
import { CatApiController } from '../../application/controllers/cat-api.controller';
import { CatApiUseCases } from '../../application/use-cases/cat-api.use-cases';

@Module({
  imports: [HttpModule],
  controllers: [CatApiController],
  providers: [
    { provide: ICatApiService, useClass: CatApiService },
    CatApiUseCases,
  ],
})
export class CatApiModule {}
