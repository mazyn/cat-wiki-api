import { Module } from '@nestjs/common';

import { BreedController } from '../../application/controllers';
import { BreedUseCases } from '../../application/use-cases';
import { IBreedService } from '../../domain/services';
import { BreedService } from '../services';
import { PrismaModule } from './prisma.module';
import { CatApiModule } from './cat-api.module';

@Module({
  imports: [PrismaModule, CatApiModule],
  controllers: [BreedController],
  providers: [
    { provide: IBreedService, useClass: BreedService },
    BreedUseCases,
  ],
})
export class BreedModule {}
