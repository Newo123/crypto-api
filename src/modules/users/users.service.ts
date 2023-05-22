import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly user: typeof User) {}

  async findUserByEmail(email: string) {
    return this.user.findOne({ where: { email: email } });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await bcrypt.hash(dto.password, 10);
    await this.user.create({
      name: dto.name,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });

    return dto;
  }

  async publicUser(email: string) {
    return this.user.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async update(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.user.update(dto, { where: { email } });
    return dto;
  }

  async delete(email: string) {
    const user = await this.user.destroy({ where: { email } });

    const isDeleted = (await user) ? true : false;

    return isDeleted;
  }
}
