import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class BootstrapAdminDto {
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  displayName?: string;
}
