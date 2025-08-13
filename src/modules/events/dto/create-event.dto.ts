import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsString, IsDateString, IsEnum, IsOptional } from "class-validator";

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
  @ApiProperty()
  @IsString()
  image_url: string;
  
  @ApiProperty()
  @IsString()
  event_url: string;
  
  @ApiProperty()
  @IsString()
  social_links: string;
  
  @ApiProperty()
  @IsEnum(Status)
  status: Status;
  
  @ApiProperty()
  @IsDateString()
  created_at: string;
  
  @ApiProperty()
  @IsOptional()
  userId: string;
}
