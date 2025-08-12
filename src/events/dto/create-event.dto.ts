import { IsString, IsDateString, IsEnum, IsOptional } from "class-validator";
import { Status } from "generated/prisma";

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  location: string;

  @IsString()
  image_url: string;

  @IsString()
  event_url: string;

  @IsString()
  social_links: string;

  @IsEnum(Status)
  status: Status;

  @IsDateString()
  created_at: string;

  @IsOptional()
  userId?: string;
}
