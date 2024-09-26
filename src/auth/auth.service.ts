/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import chalk from 'chalk';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUserByUserName(username);
        const comparePassword = await bcrypt.compare(password, user.password);
        if (user && comparePassword) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async login(user: any) {
        try {
            const { username, password, id } = user;
            const payload = {
                username,
                password,
                sub: id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new HttpException('test', HttpStatus.UNAUTHORIZED);
        }
    }
}
