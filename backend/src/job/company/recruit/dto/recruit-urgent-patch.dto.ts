import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, MinLength, IsString, IsPositive, IsNumber, IsIn } from 'class-validator';
import { JobType, RecruitStatus, Role } from '@prisma/client';

export class RecruitUrgentPatdchDto {

    @ApiProperty({
        description: 'จำนวนคนที่ต้องการรับสมัคร',
        example: 11,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive({ message: "ไอดีต้องมีค่า 1 หรือมากกว่า" })
    recruitid: number;


    @ApiProperty({
        description: 'สถานะของงาน',
        example: 'PENDING',
    })
    @IsIn(['PENDING', 'SUCCESS', 'REJECTED'])
    @IsNotEmpty()
    @IsString()
    type: RecruitStatus;


}