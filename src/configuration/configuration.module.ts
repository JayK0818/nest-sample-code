import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
// import configuration from './config/configuration';
// import databaseConfig from './config/database';
// import userConfig from './config/user';
// import * as Joi from 'joi';
import { validate } from './config/env.validation';

@Module({
  /**
   * The forRoot() method registers the ConfigService provider, which provides a get() method
   * for reading thest parsed/merged configuration variables
   */
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
      // envFilePath: ['.env', '.development.env'],
      // ignoreEnvFile: true,
      // load: [configuration],
      // load: [databaseConfig, userConfig],
      /*       validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        USERNAME: Joi.string().default('kyrie'),
      }),
      validationOptions: {
        allowUnknown: true,
      }, */
      validate,
    }),
  ],
  providers: [ConfigurationService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
