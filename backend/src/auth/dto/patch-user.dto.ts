import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn } from 'class-validator';
import { Role } from '@prisma/client';

export class AuthChangepasswordDto {

    @ApiProperty({
        description: 'รหัสผ่าน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    passwordold: string;


    @ApiProperty({
        description: 'รหัสผ่าน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    passwordnew: string;

    @ApiProperty({
        description: 'รหัสผ่าน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    passwordnewconfirm: string;
   
}