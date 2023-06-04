import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './auth.response';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthResponse })
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
  ): Promise<AuthResponse | BadRequestException> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-public-user-info')
  async getPublicUserInfo(@Req() request) {
    return this.userService.publicUser(request.user.email);
  }
}
