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
// import { ConfigurationModule } from './configuration/configuration.module';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// 此为 orm 下的两个模块 用于测试mysql
import { UserModule } from './orm/user/user.module';
import { ProfileModule } from './orm/profile/profile.module';
import { User } from './orm/entity/user.entity';
import { Profile } from './orm/entity/profile.entity';

@Module({
  imports: [
    CatsModule,
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
    TypeOrmModule.forRootAsync({
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
    }),
    UserModule,
    ProfileModule,
    // DatabaseModule,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
  ],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
