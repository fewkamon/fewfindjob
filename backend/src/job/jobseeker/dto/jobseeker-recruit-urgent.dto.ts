import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class JobseekerRecruitUrgentDto {
    @ApiProperty({
        description: 'ไอดีงาน',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}