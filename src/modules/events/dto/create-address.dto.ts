import { ApiProperty } from "@nestjs/swagger";
import { enumCity } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  complement?;

  @ApiProperty()
  @IsString()
  street;

  @ApiProperty({ required: false })
  @IsOptional()
  number?;

  @ApiProperty({ enum: enumCity })
  @IsEnum(enumCity)
  city;
}
