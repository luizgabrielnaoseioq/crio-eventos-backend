import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { EventsService } from "../events.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";

@ApiTags('Event')
@Controller("/event")
export class GetByEventController {
  constructor(private service: EventsService) {}

  @Get("/:id/details")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }
}
