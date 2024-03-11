import { Test, TestingModule } from '@nestjs/testing';
import { JobseekerService } from './jobseeker.service';

describe('JobseekerService', () => {
  let service: JobseekerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobseekerService],
    }).compile();

    service = module.get<JobseekerService>(JobseekerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
