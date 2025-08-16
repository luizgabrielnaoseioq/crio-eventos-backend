import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ModulesModule } from "./modules/modules.module";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger-middleware";

@Module({
  imports: [PrismaModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
