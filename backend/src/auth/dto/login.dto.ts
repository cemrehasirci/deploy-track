import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'Geçerli bir email adresi giriniz.',
    },
  )
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
