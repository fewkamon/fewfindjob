import { Module } from '@nestjs/common';
import { JobseekerController } from './jobseeker.controller';
import { JobseekerService } from './jobseeker.service';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './upload',
  })],
  controllers: [JobseekerController],
  providers: [JobseekerService, PrismaService]
})
export class JobseekerModule { }
