import { Controller, Get } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('config')
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}
  @Get('variable-list')
  getVariableList() {
    return this.configurationService.getVariableList();
  }
}
