import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/prisma.service';
import { GuestModule } from './guest/guest.module';
import { AwsS3Service } from 'utils/s3.service';
import { RandomService } from 'utils/random.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, AwsS3Service, RandomService],
  imports: [GuestModule]
})
export class CompanyModule {}
