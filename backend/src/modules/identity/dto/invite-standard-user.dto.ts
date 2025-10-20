import { IsEmail, MaxLength } from 'class-validator';

export class InviteStandardUserDto {
  @IsEmail()
  @MaxLength(320)
  email!: string;
}
