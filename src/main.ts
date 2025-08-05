import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors({ methods })
}
bootstrap();
