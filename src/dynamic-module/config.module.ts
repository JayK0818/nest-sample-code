import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({})
export class ConfigModule {
  static register(opts): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: opts,
        },
        ConfigService,
      ],
      controllers: [ConfigController],
    };
  }
}
