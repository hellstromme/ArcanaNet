import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('health')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  checkHealth() {
    return this.coreService.health();
  }
}
