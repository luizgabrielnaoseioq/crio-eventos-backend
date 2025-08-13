import { Module } from "@nestjs/common";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ModulesModule } from "./modules/modules.module";

@Module({
  imports: [PrismaModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
