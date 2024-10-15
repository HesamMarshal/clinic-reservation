import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Start Server
  const PORT = +3000;
  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    // console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}

bootstrap();
