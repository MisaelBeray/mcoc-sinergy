import { Test, TestingModule } from '@nestjs/testing';
import { SinergiesService } from './sinergies.service';

describe('SinergiesService', () => {
  let service: SinergiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinergiesService],
    }).compile();

    service = module.get<SinergiesService>(SinergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
