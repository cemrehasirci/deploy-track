import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEnvironmentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  clusterName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  namespace?: string;

  @IsOptional()
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message:
        'baseUrl geçerli bir URL olmalıdır. Örnek: https://staging.example.com',
    },
  )
  @MaxLength(300)
  baseUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
