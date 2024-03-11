import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Create an interface representing the nested location object
class LocationDto {
  @ApiProperty({ description: 'The ID of the location.', example: 4 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The address of the location.', example: 'หมู่บ้านวรารักษ์ 29/1422' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The district of the location.', example: '1302' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ description: 'The subdistrict of the location.', example: '130203' })
  @IsString()
  @IsNotEmpty()
  subdistrict: string;

  @ApiProperty({ description: 'The province of the location.', example: '4' })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({ description: 'The postal code of the location.', example: null })
  @IsInt()
  postalCode: number;

  @ApiProperty({ description: 'The ID of the job seeker associated with the location.', example: null })
  @IsInt()
  @IsOptional()
  jobseekerId: number | null;

  @ApiProperty({ description: 'The ID of the company associated with the location.', example: 1 })
  @IsInt()
  companyId: number;
}

// Create an interface representing the main company object
export class CompanyInfoRequestDto {
  @ApiProperty({ description: 'The ID of the company.', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The ID of the user associated with the company.', example: 17 })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'The phone number of the company.', example: '0957419962' })
  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @ApiProperty({ description: 'The name of the company.', example: 'ฟิวจำกัดมหาชนdsa' })
  @IsString()
  @IsNotEmpty()
  companyname: string;

  @ApiProperty({
    description: 'An array of tags',
    example: ['ประกันสุขภาพ', 'เทสซ่า'],
    type: [String],
  })
  @IsString({ each: true }) // This enforces that each element in the array is a string
  @IsArray()
  benefits: string[];


  @ApiProperty({
    description: 'The description of the company.',
    example:
      'ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา แต่เน้นให้บริการตามความต้องการของลูกค้า ได้แก่ การให้บริการทำสวน การซ่อมบำรุงเครื่องใช้ไฟฟ้า การให้คำปรึกษาทางธุรกิจ',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The name of the company.',
    example:
      'ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา แต่เน้นให้บริการตามความต้องการของลูกค้า ได้แก่ การให้บริการทำสวน การซ่อมบำรุงเครื่องใช้ไฟฟ้า การให้คำปรึกษาทางธุรกิจ',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The status of the company.', example: 'PENDING' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ type: LocationDto, description: 'The location of the company.' })
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto;
}
