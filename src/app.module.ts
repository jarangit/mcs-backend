import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mcs_user', // เปลี่ยนเป็นชื่อผู้ใช้ของคุณ
      password: '1234', // เปลี่ยนเป็นรหัสผ่านของคุณ
      database: 'mcs_db', // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // ตั้งค่าที่อยู่ของ entities
      synchronize: true, // ตั้งค่า true ใน dev environment เท่านั้น
    }),
    UsersModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
