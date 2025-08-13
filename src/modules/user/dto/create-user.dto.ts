import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
