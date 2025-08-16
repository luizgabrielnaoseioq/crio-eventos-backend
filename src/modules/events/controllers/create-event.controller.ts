import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { jwtDecode } from "jwt-decode";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { CreateEventDto } from "../dto/create-event.dto";
import { EventsService } from "../events.service";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { createEventSchema } from "../schemas/create-event-schema";

@ApiTags("Event")
@Controller("/event")
export class CreateEventController {
  constructor(private service: EventsService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body(new ZodValidationPipe(createEventSchema)) body: CreateEventDto, @Request() req: Request) {
    console.log(body);
    
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.replace("Bearer ", "");

    const tokenDecode = jwtDecode(token);

    const userCreateId = tokenDecode.sub;

    if (!userCreateId) throw new UnauthorizedException();

    try {
      const response = await this.service.create(body, userCreateId);
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
