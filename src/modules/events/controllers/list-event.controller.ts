import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { enumCity } from "@prisma/client";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { EventsService } from "../events.service";

@ApiTags("Event")
@Controller("/event")
export class ListEventController {
  constructor(private service: EventsService) {}

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
}
