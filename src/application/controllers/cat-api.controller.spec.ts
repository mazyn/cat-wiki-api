import { Test, TestingModule } from '@nestjs/testing';
import { CatApiController } from './cat-api.controller';

describe('CatApiController', () => {
  let controller: CatApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatApiController],
    }).compile();

    controller = module.get<CatApiController>(CatApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
