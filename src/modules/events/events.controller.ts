import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./dto/update-event.dto";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/create-event.dto";
import { jwtDecode } from "jwt-decode";
import { string } from "zod";
import { enumCity } from "@prisma/client";

@ApiTags("events")
@Controller("/events")
export class EventsController {
  constructor(private service: EventsService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createEvent: CreateEventDto) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.replace("Bearer ", "");

    const tokenDecode = jwtDecode(token);

    const userCreateId = tokenDecode.sub;

    if (!userCreateId) throw new UnauthorizedException();

    try {
      const response = await this.service.create(createEvent, userCreateId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  @ApiQuery({ name: "city", enum: enumCity, required: false })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAll(@Query("city") city?: enumCity) {
    try {
      return await this.service.findAll(city);
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/getOne/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  @HttpCode(200)
  @Patch("/update/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") eventId: string, @Body() body: UpdateEventDto) {
    try {
      return await this.service.update(eventId, body);
    } catch (error) {
      throw new BadRequestException(error.format());
    }
  }

  @Delete(":id")
  @HttpCode(200)
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
