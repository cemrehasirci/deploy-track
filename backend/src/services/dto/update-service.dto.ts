import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsOptional()
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message: 'repoUrl must be a valid URL with protocol.',
    },
  )
  @MaxLength(300)
  repoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ownerTeam?: string;
}
