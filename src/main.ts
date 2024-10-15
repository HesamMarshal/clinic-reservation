import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { SwaggerConfigInit } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Swagger
  SwaggerConfigInit(app);

  // Start Server
  // const PORT = +3000;
  const { PORT } = process.env;
  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}

bootstrap();
