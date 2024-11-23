/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
    constructor(private readonly jwt: JwtService) {}
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new UnauthorizedException("Authorization header is missing");
        }
        try {
            const rawToken = authHeader.split(" ")[1];
            const user = this.jwt.verify(rawToken, { secret: "mcs" });
            req["user"] = {
                ...user,
                id: user.sub,
            };
        } catch (error) {
            throw new UnauthorizedException("Please login");
        }
        next();
    }
}
