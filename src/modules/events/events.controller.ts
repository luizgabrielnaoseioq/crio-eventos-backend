import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { createEventSchema } from "./schemas/create-event-schema";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Events')
@Controller("/events")
export class EventsController {
  constructor(private service: EventsService) {}

  @Post(":id")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEventSchema))
  create(@Body() createEvent: CreateEventDto) {
    return this.service.create(createEvent);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, updateEvent: UpdateEventDto) {
    return this.service.update(id, updateEvent);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
