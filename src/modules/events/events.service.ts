import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Injectable } from "@nestjs/common";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, userCreationId: string) {
    const address = await this.prisma.address.create({
      data: {
        city: data.address.city,
        cep: data.address.cep,
        state: data.address.state,
        street: data.address.street,
        complement: data.address.complement,
      },
    });

    return await this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        social_links: data.social_links,
        event_url: data.event_url,
        image_url: data.image_url,
        addressId: address.id,
        userCreationId,
        categorie: data.categorie,
        status: "PENDING",
      },
      include: { address: true, EventUser: true },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
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
      data: {
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        address: {
          update: {
            city: data.address?.city,
            state: data.address?.state,
            street: data.address?.street,
            number: data.address?.number,
            cep: data.address?.cep,
          },
        },
      },
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
