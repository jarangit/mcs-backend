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
        origin: process.env.CLIENT_URL, // อนุญาตให้ร้องขอจาก Origin นี้
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Method ที่อนุญาต
        allowedHeaders: ["Content-Type", "Authorization"], // Headers ที่อนุญาต
        credentials: true, // อนุญาต Cookie หากจำเป็น
    });
    await app.listen(process.env.PORT, "0.0.0.0");
}
bootstrap();
