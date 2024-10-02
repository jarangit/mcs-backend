import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];
    console.log(
      "🚀 ~ HeadersInterceptor ~ intercept ~ authHeader:",
      authHeader,
    );

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    // สามารถตรวจสอบ header หรือทำงานอื่นๆ ได้
    console.log("Authorization:", authHeader);

    return next.handle().pipe(tap(() => console.log("Response sent")));
  }
}
