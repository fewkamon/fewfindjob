import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaService } from 'src/prisma.service';
import { RandomService } from 'utils/random.service';
import { AwsS3Service } from 'utils/s3.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService, RandomService, AwsS3Service]
})
export class NewsModule {}
