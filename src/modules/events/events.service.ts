import { Injectable } from "@nestjs/common";
import { enumCity, Status } from "@prisma/client";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, userCreationId: string) {
    const address = await this.prisma.address.create({
      data: {
        city: data.address.city,
        street: data.address.street,
        complement: data.address.complement,
        number: data.address.number,
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
        categorie: data.categorie,
        status: "PENDING",
        userCreationId,
        addressId: address.id,
      },
      include: { address: true, EventUser: true },
    });
  }

  async findAll(city?: enumCity) {
    const eventWithAddress = await this.prisma.event.findMany({
      where: city ? { address: { city } } : {},
      include: { address: true, EventUser: true },
    });

    const format = eventWithAddress.map((event) => ({
      id: event.id,
      title: event.title,
      image_url: event.image_url,
      description: event.description,
      start_date: event.start_date.toISOString(),
      end_date: event.end_date.toISOString(),
      address: event.address,
    }));

    return format;
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
            street: data.address?.street,
            number: data.address?.number,
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

  async switchStatus(id: string, status: Status) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new Error("Evento não encontrado!");
    }

    return await this.prisma.event.update({
      where: { id },
      data: { status },
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
