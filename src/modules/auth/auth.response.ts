import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthResponse {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  token: string;
}
