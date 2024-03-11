import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn } from 'class-validator';
import { Role } from '@prisma/client';

export class AuthRegisterJobSeekerDto {

    @ApiProperty({
        description: 'อีเมลผู้ใช้',
        example: 'few@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'รหัสผ่าน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    password: string;

    @ApiProperty({
        description: 'รหัสผ่านยืนยัน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    confirm: string;

    @ApiProperty({
        description: 'บทบาท',
        example: 'JOB_SEEKER',
    })
    @IsIn(['JOB_SEEKER'])
    role: Role;
}