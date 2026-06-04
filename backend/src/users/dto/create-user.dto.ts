import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @IsEmail(
    {},
    {
      message: 'Geçerli bir email adresi giriniz.',
    },
  )
  @MaxLength(150)
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Geçerli bir rol seçiniz.',
  })
  role?: Role;
}
