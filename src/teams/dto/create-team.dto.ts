import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export class CreateTeamDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Minimum length password 8 character',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsEnum(UserRole, {
    message: 'Valid role required',
  })
  readonly role: UserRole;
}
