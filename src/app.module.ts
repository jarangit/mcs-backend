import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HeadersMiddleware } from './headers/headers.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HeaderGuard } from './header/header.guard';
import { HeadersInterceptor } from './headers/headers.interceptor';
import { JwtService } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { LikeController } from './like/like.controller';
import { LikeModule } from './like/like.module';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3366,
            username: 'mcs_user', // เปลี่ยนเป็นชื่อผู้ใช้ของคุณ
            password: '1234', // เปลี่ยนเป็นรหัสผ่านของคุณ
            database: 'mcs_db', // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
            entities: [__dirname + '/**/*.entity{.ts,.js}'], // ตั้งค่าที่อยู่ของ entities
            synchronize: true, // ตั้งค่า true ใน dev environment เท่านั้น
        }),
        UsersModule,
        ProductModule,
        CategoryModule,
        LikeModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        // {
        //     provide: APP_GUARD,
        //     useClass: HeaderGuard,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: HeadersInterceptor,
        // },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(HeadersMiddleware)
            .forRoutes({ path: 'auth/*', method: RequestMethod.ALL }); // ใช้กับทุก route
    }
}
