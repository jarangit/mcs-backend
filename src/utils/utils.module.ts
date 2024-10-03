import { Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";

@Module({
  providers: [UtilsService],
  exports: [UtilsService], // Export เพื่อให้ module อื่นใช้ได้
})
export class UtilsModule {}
