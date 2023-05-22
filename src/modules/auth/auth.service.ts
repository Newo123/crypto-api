import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './auth.response';
import { LoginUserDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }

    return this.userService.createUser(dto);
  }

  async login(dto: LoginUserDto): Promise<AuthResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) {
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    }

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) {
      throw new BadRequestException(AppError.WRONG_DATA);
    }

    const userData = {
      name: existUser.name,
      email: existUser.email,
    };
    const token = await this.tokenService.getToken(userData);
    const user = await this.userService.publicUser(dto.email);

    return { ...user, token };
  }
}