import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigurationService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
