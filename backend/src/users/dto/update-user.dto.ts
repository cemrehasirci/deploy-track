import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Geçerli bir email adresi giriniz.',
    },
  )
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Geçerli bir rol seçiniz.',
  })
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
