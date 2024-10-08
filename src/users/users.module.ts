import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { User } from "src/entity/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { UtilsModule } from "src/utils/utils.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UtilsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
