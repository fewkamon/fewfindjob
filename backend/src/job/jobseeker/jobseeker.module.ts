import { Module } from '@nestjs/common';
import { JobseekerController } from './jobseeker.controller';
import { JobseekerService } from './jobseeker.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JobseekerController],
  providers: [JobseekerService, PrismaService]
})
export class JobseekerModule {}
