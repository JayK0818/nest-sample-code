import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './controller/player.controller'

@Module({
  imports: [],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
