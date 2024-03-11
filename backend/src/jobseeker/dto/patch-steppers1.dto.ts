import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength, IsString, IsDateString } from 'class-validator';
import { Gender, Role } from '@prisma/client';

export class Steppers1PatchDto {
    @ApiProperty({ example: 'นายมนุษย์' })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({ example: 'ซ่าๆฟิว' })
    @IsString()
    @IsNotEmpty()
    lastname: string;


    @ApiProperty({ example: '1990-01-01' })
    @IsDateString()
    @IsNotEmpty()
    birthdate: string;


    @ApiProperty({ example: 'MALE' })
    @IsString()
    @IsNotEmpty()
    @IsIn(['MALE', 'FEMALE', 'OTHER'])
    gender: Gender;

    @ApiProperty({
        description: 'เบอร์โทร',
        example: '0957419962',
    })
    @Length(10, 10, { message: 'หมายเลขโทรศัพท์ควรมีความยาว 10 หลัก' })
    @Matches(/^0[1-9][0-9]{8}$/i, { message: 'ท่านกรอกหมายเลขโทรศัพท์ไม่ถูกต้อง' })
    @IsNotEmpty()
    phonenumber: string;
}