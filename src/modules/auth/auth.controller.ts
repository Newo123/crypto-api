import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponse } from './auth.response';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.register(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }
}
