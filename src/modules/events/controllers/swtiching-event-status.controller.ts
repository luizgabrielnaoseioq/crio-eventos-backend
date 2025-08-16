import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from "@nestjs/common";
import { EventsService } from "../events.service";
import { Status } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import { SwitchingEventStatusDto } from "../dto/switching-event-status.dto";

@ApiTags('Event')
@Controller("/event")
export class SwitchingEventStatusController {
  constructor(private readonly service: EventsService) {}

  @Patch(":id/switch-status")
  async switchStatus(@Param("id") id: string, @Body() body: SwitchingEventStatusDto) {
    try {
      return await this.service.switchStatus(id, body.status);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
