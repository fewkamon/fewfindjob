import { Module } from '@nestjs/common';
import { JobseekerController } from './jobseeker.controller';
import { JobseekerService } from './jobseeker.service';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { AwsS3Service } from 'utils/s3.service';
import { RandomService } from 'utils/random.service';

@Module({
  
  controllers: [JobseekerController],
  providers: [JobseekerService, PrismaService, AwsS3Service, RandomService]
})
export class JobseekerModule { }
