import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { CompanyModule } from './company/company.module';
import { PrismaService } from 'src/prisma.service';
import { JobseekerModule } from './jobseeker/jobseeker.module';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService],
  imports: [CompanyModule, JobseekerModule],
})
export class JobModule {}
