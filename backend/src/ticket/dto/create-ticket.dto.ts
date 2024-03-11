import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateTicketDto {

    @ApiProperty({
        description: 'หัวข้อ',
        example: 'เว็บกากมาก',
    })
    @IsNotEmpty({message: "กรุณากรอกหัวข้อ"})
    topic: string;


    @ApiProperty({
        description: 'อีเมลผู้ใช้',
        example: 'fewcompany@gmail.com',
    })
    @IsNotEmpty({ message: 'กรุณากรอกอีเมล' })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'เบอร์โทร',
        example: '0957419962',
    })
    @Length(10, 10, { message: 'หมายเลขโทรศัพท์ควรมีความยาว 10 หลัก' })
    @Matches(/^0[1-9][0-9]{8}$/i, { message: 'ท่านกรอกหมายเลขโทรศัพท์ไม่ถูกต้อง' })
    @IsNotEmpty()
    phonenumber: string;


    @ApiProperty({
        description: 'ชื่อผู้ติดต่อ',
        example: 'นายเทส มนุษย์',
    })
    @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ติดต่อ' })
    name: string;

    @ApiProperty({
        description: 'เนื้อหา',
        example: 'เว็บเหี้ยนี้โคตรกาก',
    })
    @IsNotEmpty({message: "กรุณากรอกเนื้อหา"})
    message: string;
}