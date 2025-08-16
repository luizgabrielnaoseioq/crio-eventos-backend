import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EventsService } from "../events.service";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";

@ApiTags("Event")
@Controller("/event")
export class DeleteEventController {
  constructor(private service: EventsService) {}

  @Delete(":id")
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    try {
      return await this.service.remove(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
