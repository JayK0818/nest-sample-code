import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  getLogTypeList() {
    return ['winston', 'pino'];
  }
}
