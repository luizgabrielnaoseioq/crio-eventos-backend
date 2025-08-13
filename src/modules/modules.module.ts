import { Module } from "@nestjs/common";
import { UsersModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
