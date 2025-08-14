import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, userCreationId: string) {
    return await this.prisma.event.create({
      data: {
        ...data,
        userCreationId,
      },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany({
      include: { EventUser: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.event.findUnique({
      where: {
        id,
      },
      include: { EventUser: true },
    });
  }

  async update(id: string, data: UpdateEventDto) {
    return await this.prisma.event.update({
      where: { id },
      data,
      include: { EventUser: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.event.delete({
      where: { id },
    });
  }

  async approveEvent(eventId: string, userId: string) {
    return await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: "APPROVED",
      },
    });
  }

  async rejectedEvent(eventId: string, userId: string) {
    return await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: "REJECTED",
      },
    });
  }
}
