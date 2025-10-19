import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDto } from './dto/create-sheet.dto';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Get(':ownerId')
  listByOwner(@Param('ownerId') ownerId: string) {
    return this.sheetsService.listByOwner(ownerId);
  }

  @Post()
  create(@Body() createSheetDto: CreateSheetDto) {
    return this.sheetsService.create(createSheetDto);
  }
}
