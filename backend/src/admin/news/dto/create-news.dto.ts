import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength } from 'class-validator';

export class AdminNewsCreateDto {
    @ApiProperty({ description: 'Topic' })
    @IsNotEmpty({ message: 'กรุณากรอกหัวข้อ' })
    topic: string;

    @ApiProperty({ description: 'Detail' })
    @IsNotEmpty({ message: 'กรุณากรอกรายละเอียด' })
    detail: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @Type(() => Object)
    file: Express.Multer.File;
}