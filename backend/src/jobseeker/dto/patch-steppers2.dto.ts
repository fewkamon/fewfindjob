import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength, IsString, IsDateString, ValidateNested, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
  
    @ApiProperty({ description: 'The postal code of the location.', example: 12120 })
    @IsInt()
    postalCode: number;
  
    @ApiProperty({ description: 'The ID of the job seeker associated with the location.', example: null })
    @IsInt()
    @IsOptional()
    jobseekerId: number | null;
  
  }
  
export class Steppers2PatchDto {
    @ApiProperty({ type: LocationDto, description: 'The location of the company.' })
    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    location: LocationDto;
}
