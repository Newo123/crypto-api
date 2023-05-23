import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getToken(user) {
    const payload = { user };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: this.configService.get('TOKEN_LIFE_CYCLE'),
    });
  }
}
