import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./create-event.dto";

// ParitalType: Transforma todos os campos do outro DTO em opcionais.
export class UpdateEventDto extends PartialType(CreateEventDto) {

}
