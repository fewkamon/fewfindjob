import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class AuthLoginDto {

    @ApiProperty({
        description: 'อีเมลผู้ใช้',
        example: 'fewcompany@gmail.com',
    })
    @IsNotEmpty({ message: 'กรุณากรอกอีเมล' })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'รหัสผ่าน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 หลัก' })
    password: string;
}