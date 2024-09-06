import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // เปิดใช้งาน CORS
  app.enableCors({
    origin: 'http://localhost:3000', // อนุญาตแค่โดเมนนี้ หรือใช้ '*' เพื่ออนุญาตทุกโดเมน
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // กำหนดว่าต้องส่ง cookies กับ request หรือไม่
  });
  await app.listen(3001);
}
bootstrap();
