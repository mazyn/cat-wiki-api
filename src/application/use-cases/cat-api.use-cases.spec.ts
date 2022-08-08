import { Test, TestingModule } from '@nestjs/testing';
import { CatApiUseCases } from './cat-api.use-cases';

describe('CatApiUseCases', () => {
  let provider: CatApiUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatApiUseCases],
    }).compile();

    provider = module.get<CatApiUseCases>(CatApiUseCases);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
