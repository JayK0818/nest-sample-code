import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './controller/player.controller';
import { CatsModule } from './provider/cats.module';
import { BookModule } from './module/book/book.module';
import { AuthModule } from './module/author/author.module';
import { MenuModule } from './module/menu/menu.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { ExceptionModule } from './exception/exception.module';
import { PipeModule } from './pipe/pipe.module';
import { GuardModule } from './guards/guards.module';
import { UserModule as DynamicModuleUserModule } from './dynamic-module/user/user.module';
import { AuthModule as DynamicModuleAuthModule } from './dynamic-module/auth/auth.module';
// import { ConfigurationModule } from './configuration/configuration.module';
// import { DatabaseModule } from './database/database.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// 此为 orm 下的两个模块 用于测试mysql
// import { UserModule } from './orm/user/user.module';
// import { ProfileModule } from './orm/profile/profile.module';
// import { User } from './orm/entity/user.entity';
// import { Profile } from './orm/entity/profile.entity';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { InterceptorModule } from './interceptors/interceptor.module';
import { CustomDecoratorModule } from './custom-decorator/decorator.module';
import { ExecutionContextModule } from './execution-context/context.module';
// import { CustomProviderModule } from './custom-providers/cats.module';
// logger
/* import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston'; */
// 动态module
import { ConfigModule as DynimacConfigModule } from './dynamic-module/config.module';
import { ValidationModule } from './validation/validation.module';
import { CacheModule } from './cache/cache.module';
import { SerializationModule } from './serialization/serialization.module';
import { VersionModule } from './version/version.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskScheduleModule } from './task-schedule/task.module';
// cookie module
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CookieModule } from './cookie/cookie.module';
import { EventEmitterModule as CustomEventEmitterModule } from './event-emitter/event-emitter.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { StreamModule } from './stream/stream.module';
import { SessionModule } from './session/session.module';
import { ViewModule } from './model-view-controller/view.module';
import { RouterModule } from '@nestjs/core';
import { RateLimitingModule } from './rate-limit/rate-limit.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthModule as AuthenticationModule } from './authentication/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SampleModule } from './sample/sample.module';
@Module({
  imports: [
    // ScheduleModule.forRoot(),
    // TaskScheduleModule,
    CookieModule,
    CatsModule,
    LoggerModule,
    BookModule,
    AuthModule,
    MenuModule,
    MiddlewareModule,
    ExceptionModule,
    PipeModule,
    GuardModule,
    ConfigModule.forRoot(),
    // ConfigurationModule,
    /*     TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      entities: [User],
      database: 'test',
    }), */
    /*     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<number>('PORT'));
        return {
          type: 'mysql',
          port: 3306,
          host: '127.0.0.1',
          username: 'root',
          password: '15209891396kyrie',
          database: 'nest',
          synchronize: true,
          entities: [User, Profile],
        };
      },
    }), */
    // UserModule,
    // ProfileModule,
    /*     WinstonModule.forRoot({
      level: 'error',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label({ label: 'hello message' }),
            winston.format.colorize(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'log.txt',
          level: 'error',
        }),
      ],
    }), */
    // DatabaseModule,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    WinstonModule.forRoot({}),
    InterceptorModule,
    CustomDecoratorModule,
    // CustomProviderModule,
    DynamicModuleUserModule,
    DynamicModuleAuthModule,
    DynimacConfigModule.register({ message: 'hello world' }),
    ExecutionContextModule,
    ValidationModule,
    CacheModule,
    SerializationModule,
    VersionModule,
    EventEmitterModule.forRoot(),
    CustomEventEmitterModule,
    MulterModule.register({
      storage: multer.diskStorage({
        destination: 'uploads/',
      }),
    }),
    StreamModule,
    FileUploadModule,
    SessionModule,
    ViewModule,
    RateLimitingModule,
    /*     ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: 5,
      },
    ]), */
    AuthorizationModule,
    AuthenticationModule,
    JwtModule.register({
      global: true,
      secret: 'hello',
    }),
    SampleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerModule,
    },
    AppService,
  ],
  controllers: [AppController, PlayerController],
})
export class AppModule {}
