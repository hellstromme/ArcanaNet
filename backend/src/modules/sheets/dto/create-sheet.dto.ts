import { IsEnum, IsString } from 'class-validator';

export enum SheetType {
  PLAYER = 'player',
  NPC = 'npc',
}

export class CreateSheetDto {
  @IsString()
  title!: string;

  @IsString()
  system!: string;

  @IsString()
  ownerId!: string;

  @IsEnum(SheetType)
  type!: SheetType;
}
