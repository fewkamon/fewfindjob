import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, MinLength, IsString, IsPositive, IsNumber, IsIn } from 'class-validator';
import { JobType, Role } from '@prisma/client';

export class CompanyRegisterCompanyDto {
    @ApiProperty({
        description: 'ชื่อตำแหน่งงาน',
        example: 'นักพัฒนาซอฟต์แวร์',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'ประเภทงาน',
        example: 'FULL_TIME',
    })
    @IsIn(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE'])
    @IsNotEmpty()
    @IsString()
    type: JobType;

    @ApiProperty({
        description: 'ค่าจ้างงาน',
        example: 70000,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive({message: "จำนวนค่าจ้างต้องไม่เท่ากับ 0 หรือน้อยกว่า"})
    salary: number;

    @ApiProperty({
        description: 'จำนวนคนที่ต้องการรับสมัคร',
        example: 3,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive({message: "จำนวนที่รับพนักงานต้องไม่เท่ากับ 0 หรือน้อยกว่า"})
    employeeCount: number;

    @ApiProperty({
        description: 'รายละเอียดงาน',
        example: 'เรากำลังมองหานักพัฒนาซอฟต์แวร์ที่มีความเชี่ยวชาญ...',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'คุณสมบัติที่ต้องการ',
        example: 'ปริญญาตรีในสาขาวิทยาการคอมพิวเตอร์...',
    })
    @IsNotEmpty()
    @IsString()
    qualifications: string;

    @ApiProperty({
        description: 'คุณสมบัติที่ต้องการ',
        example: 'ปริญญาตรีในสาขาวิทยาการคอมพิวเตอร์...',
    })
    @IsNotEmpty()
    @IsString()
    how_to_apply: string;

    @ApiProperty({
        description: 'คุณสมบัติที่ต้องการ',
        example: 'ปริญญาตรีในสาขาวิทยาการคอมพิวเตอร์...',
    })
    @IsNotEmpty()
    @IsString()
    contact: string;
}