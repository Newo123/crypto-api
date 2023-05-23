import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

class UserResponse {
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
}

export class AuthResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  @IsString()
  token: string;
}
