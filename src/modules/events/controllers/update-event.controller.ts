import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { UpdateEventDto } from "../dto/update-event.dto";
import { EventsService } from "../events.service";

@ApiTags("Event")
@Controller("/event")
export class UpdateEventController {
  constructor(private service: EventsService) {}

  @HttpCode(200)
  @Put("/:id/update")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") eventId: string, @Body() body: UpdateEventDto) {
    try {
      return await this.service.update(eventId, body);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
