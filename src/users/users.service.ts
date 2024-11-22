import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UtilsService } from "src/utils/utils.service";

const mockDataUserImage = [
  "https://img.freepik.com/free-photo/close-up-beautiful-smiley-woman_23-2149093362.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-photo/black-model-posing_23-2148171735.jpg?t=st=1728356051~exp=1728359651~hmac=2da0439b684895c524f4138256928d3d0c5734bd9ee4df4beec98b14b0c78124&w=900",
  "https://img.freepik.com/free-photo/portrait-young-african-american-man-wearing-sunglasses_23-2148932876.jpg?t=st=1728356077~exp=1728359677~hmac=30feb1b22a19a9a364fea544276bfc01dc53e2712124df535e2728f23f538099&w=996",
];
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    protected readonly utilsService: UtilsService,
  ) { }

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
      profileImage: this.utilsService.getRandomImg(mockDataUserImage),
    });
    return this.userRepository.save(newUser);
  }

  async findUserByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(error.massage, HttpStatus.BAD_REQUEST);
    }
  }
}
