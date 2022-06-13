import { Test, TestingModule } from '@nestjs/testing';
import { SpecialAttacksResolver } from './special-attacks.resolver';
import { SpecialAttacksService } from './special-attacks.service';

describe('SkillsResolver', () => {
  let resolver: SpecialAttacksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialAttacksResolver, { provide: SpecialAttacksService, useValue: {} }],
    }).compile();

    resolver = module.get<SpecialAttacksResolver>(SpecialAttacksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
