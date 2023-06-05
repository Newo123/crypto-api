import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch()
  async update(
    @Body() dto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    return this.userService.update(user.id, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch('change-password')
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() request,
  ): Promise<UpdatePasswordDto> {
    const user = request.user;
    return this.userService.updatePassword(user.id, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete()
  async delete(@Req() request): Promise<boolean> {
    const user = await request.user;
    return this.userService.delete(user.id);
  }
}
