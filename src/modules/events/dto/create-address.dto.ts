import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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

  @ApiProperty()
  @IsString()
  city;

  @ApiProperty()
  @IsString()
  state;

  @ApiProperty()
  @IsString()
  cep;
}
