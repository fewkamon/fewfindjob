import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength, IsNumber } from 'class-validator';

export class JobseekerRecruitFileDto {
    @ApiProperty({
        description: 'ไอดีงาน',
        example: 1,
    })
    @IsNotEmpty()
    id: string;
    
    @ApiProperty({ description: 'email' })
    @IsNotEmpty({ message: 'email' })
    email: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @Type(() => Object)
    file: Express.Multer.File;
}