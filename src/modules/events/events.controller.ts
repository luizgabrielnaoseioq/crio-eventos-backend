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
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/create-event.dto";
import { jwtDecode } from "jwt-decode";

@Controller("/events")
export class EventsController {
  constructor(private service: EventsService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createEvent: CreateEventDto) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.replace("Bearer ", "");

    const tokenDecode = jwtDecode(token);

    const userCreateId = tokenDecode.sub;

    if (!userCreateId) throw new UnauthorizedException();

    console.log("teste decodifica token", userCreateId);

    try {
      const response = await this.service.create(createEvent, userCreateId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  @ApiBearerAuth()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateEvent: UpdateEventDto) {
    try {
      return await this.service.update(id, updateEvent);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    try {
      return await this.service.remove(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Put("/approve/:eventId")
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async reproveEvent(@Request() req, @Param("eventId") eventId: string) {
    const userId = req.user.sub;
    try {
      return await this.service.rejectedEvent(eventId, userId);
    } catch (error) {}
  }
}
