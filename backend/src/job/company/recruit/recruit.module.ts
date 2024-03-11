import { Module } from '@nestjs/common';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecruitController],
  providers: [RecruitService, PrismaService]
})
export class RecruitModule {}
