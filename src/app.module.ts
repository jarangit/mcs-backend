import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { HeadersMiddleware } from "./headers/headers.middleware";
import { JwtService } from "@nestjs/jwt";
import { CategoryModule } from "./category/category.module";
import { LikeModule } from "./like/like.module";
import { LoggerMiddleware } from "./middelwave/logging";
import { UtilsService } from "./utils/utils.service";
import { UtilsModule } from "./utils/utils.module";
import { ProductModule as PublicProductModule } from "./public-api/product/product.module";
import { UserModule } from "./public-api/user/user.module";
import { CollectionModule } from "./collection/collection.module";
import { ConfigModule } from "@nestjs/config";
import { StCategoryModule } from "./system-data/st-category/st-category.module";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // TypeOrmModule.forRoot({
        //     type: "mysql",
        //     host: "localhost",
        //     port: 3366,
        //     username: "mcs_user", // เปลี่ยนเป็นชื่อผู้ใช้ของคุณ
        //     password: "1234", // เปลี่ยนเป็นรหัสผ่านของคุณ
        //     database: "mcs_db", // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
        //     entities: [__dirname + "/**/*.entity{.ts,.js}"], // ตั้งค่าที่อยู่ของ entities
        //     synchronize: true, // ตั้งค่า true ใน dev environment เท่านั้น
        // }),
        TypeOrmModule.forRoot({
            type: "mysql",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true, // ควรปิดใน Production
        }),
        UsersModule,
        ProductModule,
        CategoryModule,
        LikeModule,
        UtilsModule,
        PublicProductModule,
        UserModule,
        CollectionModule,
        StCategoryModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        UtilsService,
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
            .apply(HeadersMiddleware, LoggerMiddleware)
            .forRoutes({ path: "auth/*", method: RequestMethod.ALL }); // ใช้กับทุก route
    }
}
