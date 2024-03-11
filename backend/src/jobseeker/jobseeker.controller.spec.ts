import { Test, TestingModule } from '@nestjs/testing';
import { JobseekerController } from './jobseeker.controller';

describe('JobseekerController', () => {
  let controller: JobseekerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobseekerController],
    }).compile();

    controller = module.get<JobseekerController>(JobseekerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
