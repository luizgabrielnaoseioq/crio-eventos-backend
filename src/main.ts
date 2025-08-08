import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS - Aberto para todas as origens
  app.enableCors({
    origin: true, // Permite todas as origens
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["*"], // Permite todos os headers
    credentials: true, // Permite cookies e headers de autenticação
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT ?? 3000}`);
}
bootstrap();
