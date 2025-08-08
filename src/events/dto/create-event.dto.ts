import {
  IsString,
  IsDateString,
  IsEnum,
  IsOptional,
  IsInt,
} from "class-validator";
import { Status } from "generated/prisma";

export class CreateEventDto {
  @IsString()
  title: String;

  @IsString()
  description: String;

  @IsDateString()
  start_date: String;

  @IsDateString()
  end_date: String;

  @IsString()
  location: String;

  @IsString()
  image_url: String;

  @IsString()
  event_url: String;

  @IsString()
  social_links: String;

  @IsEnum(Status)
  status: Status;

  // Opcional se quiser permitir eventos sem criador por enquanto.
  @IsOptional()
  @IsInt()
  userId?: number;


}
