import { Test, TestingModule } from '@nestjs/testing';
import { ChampionsResolver } from './champions.resolver';
import { ChampionsService } from './champions.service';

describe('ChampionsResolver', () => {
  let resolver: ChampionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampionsResolver, ChampionsService],
    }).compile();

    resolver = module.get<ChampionsResolver>(ChampionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
