import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @Length(6, 20)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
  newPassword: string;
}
