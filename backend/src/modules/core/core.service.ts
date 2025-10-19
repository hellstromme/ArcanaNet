import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
