import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobGetDto {
  @ApiProperty({ example: '', description: 'Password of the user' })
  @IsOptional()
  @IsString()
  keyword: string;

  @ApiProperty({ example: 'FULL_TIME,PART_TIME', description: 'Username of the user' })
  @IsNotEmpty()
  type: string;
}
