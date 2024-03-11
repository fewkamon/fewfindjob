import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class AdminCompanyPatchDto {
    @ApiProperty({ description: 'User ID' })
    @IsNotEmpty({ message: 'กรุณากรอกอีเมล' })
    id: string;

    @ApiProperty({ description: 'Status' })
    @IsNotEmpty({ message: 'กรุณากรอกสถานะของ company' })
    status: string;
}