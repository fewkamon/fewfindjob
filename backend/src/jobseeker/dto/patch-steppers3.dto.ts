import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches, IsIn, MinLength, IsString, IsDateString, ValidateNested, IsInt, IsOptional, IsEnum, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { DrivingAbility, PrivateVehicle } from '@prisma/client';

export class CreateSkillDto {
  @ApiProperty({ example: 30 })
  @IsString()
  th_typing: string;

  @ApiProperty({ example: 50 })
  @IsString()
  eng_typing: string;

  @ApiProperty({ example: ['CAR', 'MOTORCYCLE'] })
  @IsEnum(DrivingAbility, { each: true })
  driving_ability: DrivingAbility[];

  @ApiProperty({ example: ['CAR', 'MOTORCYCLE'] })
  @IsEnum(PrivateVehicle, { each: true })
  private_vehicle: PrivateVehicle[];

  @ApiProperty({ example: 'Other special skills' })
  @IsString()
  other_special_skills: string;

  @ApiProperty({ example: 'Achievements' })
  @IsString()
  achievements: string;

  @ApiProperty({ example: 'Other experience' })
  other_experience: string;

  @ApiProperty({ example: 'References' })
  @IsString()
  references: string;
}


export class Steppers3PatchDto {
  @ApiProperty({ type: CreateSkillDto, description: 'The Skill.' })
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skill: CreateSkillDto;
}
