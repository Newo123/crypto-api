import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { AuthResponse } from '../auth/auth.response';
import { TokenService } from '../token/token.service';
import { WatchListModel } from '../watchlist/watchlist.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly user: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.user.findOne({
        where: { email: email },
        include: {
          model: WatchListModel,
          required: false,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return this.user.findOne({
        where: { id },
        include: {
          model: WatchListModel,
          required: false,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    try {
      dto.password = await bcrypt.hash(dto.password, 10);
      await this.user.create({
        name: dto.name,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
      });

      return dto;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async publicUser(email: string): Promise<AuthResponse> {
    try {
      const user = await this.user.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchListModel,
          required: false,
        },
      });
      const token = await this.tokenService.getToken(user);
      return { user, token };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.user.update(dto, { where: { id } });
      return dto;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePassword(id: number, dto: UpdatePasswordDto): Promise<any> {
    try {
      const { password } = await this.findUserById(id);
      const currentPassword = await bcrypt.compare(dto.oldPassword, password);
      if (!currentPassword) {
        return new BadRequestException(AppError.WRONG_DATA);
      }
      const data = {
        password: await bcrypt.hash(dto.newPassword, 10),
      };
      return this.user.update(data, { where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(email: string): Promise<boolean> {
    try {
      const user = await this.user.destroy({ where: { email } });

      const isDeleted = (await user) ? true : false;

      return isDeleted;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
