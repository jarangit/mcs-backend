import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    // คุณสามารถเพิ่มการตรวจสอบอื่นๆ ได้ที่นี่ เช่นการตรวจสอบ Token
    console.log("Authorization:", authHeader);

    return true; // อนุญาตให้ดำเนินการต่อไปยัง controller
  }
}
