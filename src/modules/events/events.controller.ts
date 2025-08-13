import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { createEventSchema } from "./schemas/create-event-schema";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";

@Controller("/events")
export class EventsController {
  constructor(private service: EventsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createEventSchema))
  async create(@Body() createEvent: CreateEventDto) {
    try {
      return await this.service.create(createEvent);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateEvent: UpdateEventDto) {
    try {
      return await this.service.update(id, updateEvent);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    try {
      return await this.service.remove(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Put("/:eventId")
  @UseGuards(JwtAuthGuard)
  async approveEvent(@Request() req, @Param("eventId") eventId: string) {
    const userId = req.user.sub;

    try {
      return await this.service.approveEvent(eventId, userId);
    } catch (error) {
      console.log(error);
    }
  }
}
