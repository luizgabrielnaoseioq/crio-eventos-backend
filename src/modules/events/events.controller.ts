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
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";

@Controller("/events")
export class EventsController {
  constructor(private service: EventsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createEvent: any) {
    const userCreationId = req.sub;

    console.log(req);
    try {
      const response = await this.service.create(createEvent, userCreationId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
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

  @Put("/approve/:eventId")
  @UseGuards(JwtAuthGuard)
  async approveEvent(@Request() req, @Param("eventId") eventId: string) {
    const userId = req.user.sub;

    try {
      return await this.service.approveEvent(eventId, userId);
    } catch (error) {
      console.log(error);
    }
  }

  @Put("/reprove/:eventId")
  @UseGuards(JwtAuthGuard)
  async reproveEvent(@Request() req, @Param("eventId") eventId: string) {
    const userId = req.user.sub;
    try {
      return await this.service.rejectedEvent(eventId, userId);
    } catch (error) {}
  }
}
