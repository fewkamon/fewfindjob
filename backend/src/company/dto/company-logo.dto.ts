import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength, IsString, IsDateString, ValidateNested, IsInt, IsOptional, IsEnum, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export class CompanyLogo {
  @ApiProperty({ type: 'string', format: 'binary' })
  @Type(() => Object)
  file: Express.Multer.File;
}
