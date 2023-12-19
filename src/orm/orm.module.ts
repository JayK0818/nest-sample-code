import { Module } from '@nestjs/common';
import { OrmController } from './orm.controller';
import { OrmService } from './orm.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [OrmController],
  providers: [OrmService],
})
export class OrmModule {}
