import { Test, TestingModule } from '@nestjs/testing';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

describe('SkillsResolver', () => {
  let resolver: TagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsResolver, { provide: TagsService, useValue: {} }],
    }).compile();

    resolver = module.get<TagsResolver>(TagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
