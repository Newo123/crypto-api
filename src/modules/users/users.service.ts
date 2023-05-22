import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  async getUsers() {
    return this.configService.get('POSTGRES_USER');
  }
}
