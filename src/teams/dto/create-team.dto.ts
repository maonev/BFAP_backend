import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
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

  @IsOptional()
  @Matches(/^[a-z-]+$/, {
    message: 'A slug may only contain a name and a hyphen',
  })
  @MinLength(7)
  readonly slug?: string;

  @IsEnum(UserRole, {
    message: 'Valid role required',
  })
  readonly role: UserRole;
}
