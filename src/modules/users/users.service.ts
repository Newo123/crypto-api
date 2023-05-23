import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { WatchListModel } from '../watchlist/watchlist.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

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
      throw new Error(error);
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
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.user.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchListModel,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.user.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(email: string): Promise<boolean> {
    try {
      const user = await this.user.destroy({ where: { email } });

      const isDeleted = (await user) ? true : false;

      return isDeleted;
    } catch (error) {
      throw new Error(error);
    }
  }
}
