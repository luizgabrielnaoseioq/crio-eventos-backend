import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./create-event.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { $Enums } from "@prisma/client";

// ParitalType: Transforma todos os campos do outro DTO em opcionais.
export class UpdateEventDto extends CreateEventDto {}
