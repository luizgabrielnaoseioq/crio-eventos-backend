import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEventController } from "./controllers/create-event.controller";
import { ListEventController } from "./controllers/list-event.controller";
import { UpdateEventController } from "./controllers/update-event.controller";
import { GetByEventController } from "./controllers/get-by-event.controller";
import { DeleteEventController } from "./controllers/delete-event.controller";
import { SwitchingEventStatusController } from "./controllers/swtiching-event-status.controller";

@Module({
  controllers: [
    CreateEventController,
    UpdateEventController,
    ListEventController,
    GetByEventController,
    DeleteEventController,
    SwitchingEventStatusController
  ],
  providers: [EventsService, PrismaService],
})
export class EventsModule {}
