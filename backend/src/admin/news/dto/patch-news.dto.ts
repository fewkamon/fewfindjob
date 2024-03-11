import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';
import { NewsStatus, Role } from '@prisma/client';

export class AdminNewsPatchDto {
    @ApiProperty({ description: 'Status', example: "PRIVATE" })
    @IsNotEmpty({ message: 'กรุณากรอกสถานะของ company' })
    status: NewsStatus;
}