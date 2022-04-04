import { Test, TestingModule } from '@nestjs/testing';
import { SinergiesResolver } from './sinergies.resolver';
import { SinergiesService } from './sinergies.service';

describe('SinergiesResolver', () => {
  let resolver: SinergiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinergiesResolver, SinergiesService],
    }).compile();

    resolver = module.get<SinergiesResolver>(SinergiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
