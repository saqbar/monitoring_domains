import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDomainDto {
  @IsString()
  @ApiProperty({
    description: 'имя домена',
    minimum: 1,
    default: 'google',
  })
  name: string;

  @IsUrl()
  @IsString()
  @MinLength(5)
  @MaxLength(35)
  @ApiProperty({
    description: 'имя домена',
    minimum: 1,
    default: 'google.com',
  })
  domain: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'фраза для поиска в html сайта',
    minimum: 1,
    default: 'some html text',
  })
  row_text?: string;
}
