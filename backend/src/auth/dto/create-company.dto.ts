import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class AuthRegisterCompanyDto {

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
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    password: string;

    @ApiProperty({
        description: 'รหัสผ่านยืนยัน',
        example: 'Password@123',
    })
    @IsNotEmpty()
    @Length(6, 30, { message: 'รหัสผ่านยืนยันต้องมีความยาวอย่างน้อย 6 หลัก' })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i, { message: 'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ' })
    confirm: string;

    @ApiProperty({
        description: 'บทบาท',
        example: 'COMPANY',
    })
    @IsNotEmpty()
    @IsIn(['COMPANY'])
    role: Role;

    @ApiProperty({
        description: 'เบอร์โทร',
        example: '0957419962',
    })
    @Length(10, 10, { message: 'หมายเลขโทรศัพท์ควรมีความยาว 10 หลัก' })
    @Matches(/^0[1-9][0-9]{8}$/i, { message: 'ท่านกรอกหมายเลขโทรศัพท์ไม่ถูกต้อง' })
    @IsNotEmpty()
    phonenumber: string;

    @ApiProperty({
        description: 'ชื่อบริษัท',
        example: 'ฟิวจำกัดมหาชน',
    })
    @Length(4, 50, { message: 'ชื่อบริษัทควรมีความยาว 4 ตัว และไม่เกิน 50 ตัว' })
    companyname: string;

    @ApiProperty({
        description: 'ลักษณะธุรกิจ',
        example: 'ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา แต่เน้นให้บริการตามความต้องการของลูกค้า ได้แก่ การให้บริการทำสวน การซ่อมบำรุงเครื่องใช้ไฟฟ้า การให้คำปรึกษาทางธุรกิจ',
    })
    @MinLength(4, { message: 'ลักษณะธุรกิจควรมีความยาวอย่างน้อย 10 ตัวอักษร' })
    description: string;

    @ApiProperty({
        description: 'ชื่อผู้ติดต่อ',
        example: 'นายเทส มนุษย์',
    })
    @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ติดต่อ' })
    name: string;
}