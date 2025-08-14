import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { date } from "zod";
import { Event } from "@prisma/client";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, userCreationId: string) {
    await this.prisma.event.create({
      data: {
        description: data.description,
        end_date: data.end_date,
        event_url: data.event_url,
        image_url: data.image_url,
        location: data.location,
        social_links: data.social_links,
        start_date: data.start_date,
        title: data.title,
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
