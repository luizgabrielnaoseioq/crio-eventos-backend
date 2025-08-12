import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventDto) {
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

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
      include: { created_by: true },
    });
  }

  update(id: string, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data,
      include: { created_by: true },
    });
  }

  remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
