import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('dynamic-module/service')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get('get-options')
  getInjectOptions() {
    return this.configService.getOptions();
  }
}
