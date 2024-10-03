import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const dupUserName = await this.userRepository.findOne({
      where: { username: username },
    });
    if (dupUserName) {
      throw new HttpException("dup username", HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email: "my@email.com",
    });
    return this.userRepository.save(newUser);
  }

  async findUserByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
