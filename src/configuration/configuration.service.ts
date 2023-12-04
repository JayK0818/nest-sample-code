import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}
  getVariableList() {
    return this.configService.get('DATABASE_USER');
  }
}
