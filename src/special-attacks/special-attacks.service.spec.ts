import { Test, TestingModule } from '@nestjs/testing';
import { SpecialAttacksService } from './special-attacks.service';

describe('SpecialAttacksService', () => {
  let service: SpecialAttacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialAttacksService],
    }).compile();

    service = module.get<SpecialAttacksService>(SpecialAttacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
