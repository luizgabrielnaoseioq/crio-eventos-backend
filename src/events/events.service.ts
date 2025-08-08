import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventDto, userId: number) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        location: data.location,
        image_url: data.image_url,
        event_url: data.event_url,
        social_links: data.social_links,
        status: data.status,
        created_by: { connect: { id: data.userId } },
        created_at: data.created_at,
      },
      include: { created_by: true },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: { created_by: true },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      include: { created_by: true },
    });
  }

  update(id: number, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data,
      include: { created_by: true },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
