import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsUUID,
} from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { Categories } from "@prisma/client";

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  start_date: string;

  @ApiProperty()
  @IsDateString()
  end_date: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image_url: string;

  @ApiProperty()
  @IsString()
  event_url: string;

  @ApiProperty()
  @IsString()
  social_links: string;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({
    required: false,
    enum: Categories,
  })
  @IsEnum(Categories)
  @IsOptional() // Por enquanto deixar opcional.
  categorie: Categories;
}
