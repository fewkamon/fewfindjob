import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobGetOneDto {
  @ApiProperty({ example: '', description: 'get Id' })
  id: string;
}
