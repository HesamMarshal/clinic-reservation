import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerConfigInit } from "./config/swagger.config";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure Swagger
  SwaggerConfigInit(app);

  // Activate Validation
  app.useGlobalPipes(new ValidationPipe());

  // Activate Cookie Parser
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Start Server
  const { PORT } = process.env;
  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}

bootstrap();
