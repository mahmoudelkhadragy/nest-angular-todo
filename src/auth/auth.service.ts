import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './../DTO/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDTO } from 'src/DTO/userLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(registerDTO: RegisterUserDTO) {
    const { username, password } = registerDTO;
    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);

    const foundUser = await this.repo.findOne({ username });
    if (foundUser) {
      return new BadRequestException({ message: 'Username already taken' });
    } else {
      const user = new UserEntity();
      user.username = username;
      user.password = hashed;
      user.salt = salt;

      this.repo.create(user);

      try {
        return await this.repo.save(user);
      } catch (ex) {
        throw new InternalServerErrorException(
          'Something went wrong, user was not created.',
        );
      }
    }
  }

  async loginUser(userLoginDTO: UserLoginDTO) {
    const { username, password } = userLoginDTO;
    const user = await this.repo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
