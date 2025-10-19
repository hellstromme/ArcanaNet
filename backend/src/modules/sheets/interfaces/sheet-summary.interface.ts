import { SheetType } from '../dto/create-sheet.dto';

export interface SheetSummary {
  id: string;
  title: string;
  system: string;
  ownerId: string;
  type: SheetType;
}
