import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminCompanyController } from './company/company.controller';
import { PrismaService } from 'src/prisma.service';
import { AdminCompanyService } from './company/company.service';
import { JobModule } from './company/job/job.module';
import { NewsModule } from './news/news.module';
import { JobseekerModule } from './jobseeker/jobseeker.module';

@Module({
  providers: [AdminService, PrismaService, AdminCompanyService],
  controllers: [AdminController, AdminCompanyController],
  imports: [JobModule, NewsModule, JobseekerModule]
})
export class AdminModule { }
