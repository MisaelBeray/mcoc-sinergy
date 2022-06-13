import { Test, TestingModule } from '@nestjs/testing';
import { ChampionsResolver } from './champions.resolver';
import { ChampionsService } from './champions.service';

describe('SkillsResolver', () => {
  let resolver: ChampionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChampionsResolver,
        { provide: ChampionsService, useValue: {} }
      ],
    }).compile();

    resolver = module.get<ChampionsResolver>(ChampionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
