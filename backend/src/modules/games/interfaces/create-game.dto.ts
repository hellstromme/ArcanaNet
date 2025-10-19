import { IsDateString, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title!: string;

  @IsString()
  system!: string;

  @IsString()
  gmId!: string;

  @IsDateString()
  scheduledFor!: string;
}
