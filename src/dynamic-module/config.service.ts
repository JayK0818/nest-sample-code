import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(
    @Inject('CONFIG_OPTIONS') private options: Record<string, string>,
  ) {}
  getOptions() {
    return this.options;
  }
}
