import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Minimum length password 8 character',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsEnum(['SUPERADMIN', 'ADMIN', 'MEMBER'], {
    message: 'Valid role required',
  })
  role: 'SUPERADMIN' | 'ADMIN' | 'MEMBER';

  refreshToken: string = '';
}
