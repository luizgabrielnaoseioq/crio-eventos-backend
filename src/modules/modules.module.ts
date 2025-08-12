import { Module } from "@nestjs/common";
import { UsersModule } from "./auth/users.module";

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: []
})

export class ModulesModule { }