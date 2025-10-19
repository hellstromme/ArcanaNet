import { Injectable } from '@nestjs/common';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { SheetSummary } from './interfaces/sheet-summary.interface';

@Injectable()
export class SheetsService {
  private readonly sheets: SheetSummary[] = [];

  listByOwner(ownerId: string): SheetSummary[] {
    return this.sheets.filter((sheet) => sheet.ownerId === ownerId);
  }

  create(createSheetDto: CreateSheetDto): SheetSummary {
    const sheet: SheetSummary = {
      id: `sheet_${this.sheets.length + 1}`,
      ownerId: createSheetDto.ownerId,
      title: createSheetDto.title,
      system: createSheetDto.system,
      type: createSheetDto.type,
    };

    this.sheets.push(sheet);
    return sheet;
  }
}
