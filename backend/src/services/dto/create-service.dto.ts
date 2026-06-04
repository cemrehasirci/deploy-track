import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message:
        'repoUrl geçerli bir URL olmalıdır. Örnek: https://github.com/user/repo',
    },
  )
  @MaxLength(300)
  repoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ownerTeam?: string;
}
