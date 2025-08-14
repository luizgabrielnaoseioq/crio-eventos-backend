import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsOptional } from "class-validator";

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
}
