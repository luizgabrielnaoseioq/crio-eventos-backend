import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { EventsModule } from "./events/events.module";

@Module({
    imports: [AuthModule, UserModule, EventsModule],
    controllers: [],
    providers: []
})

export class ModulesModule { }