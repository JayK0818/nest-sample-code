import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './controller/player.controller'
import { CatsModule } from './provider/cats.module'
import { BookModule } from './module/book/book.module'
import { AuthModule } from './module/author/author.module'
import { MenuModule } from './module/menu/menu.module'
import { MiddlewareModule } from './middleware/middleware.module'
import { ExceptionModule } from './exception/exception.module'
import { PipeModule } from './pipe/pipe.module'
import { GuardModule } from './guards/guards.module'
@Module({
  imports: [
    CatsModule, BookModule, AuthModule, MenuModule, MiddlewareModule, ExceptionModule,
    PipeModule, GuardModule
  ],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
