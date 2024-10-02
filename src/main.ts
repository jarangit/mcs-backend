import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./middelwave/error-filtter";
import { EmojiLogger } from "./middelwave/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());
  // เปิดใช้งาน CORS
  app.enableCors({
    origin: "http://localhost:3000", // อนุญาตแค่โดเมนนี้ หรือใช้ '*' เพื่ออนุญาตทุกโดเมน
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // กำหนดว่าต้องส่ง cookies กับ request หรือไม่
  });
  await app.listen(3001);
}
bootstrap();
