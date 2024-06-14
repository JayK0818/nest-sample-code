import { Module } from "@nestjs/common";
import { ClassController } from "./class.controller";
import { ClassService } from './class.service'
import { ClassEntity } from './class.entity'
import { StudentEntity } from './student.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [ClassController],
  providers: [ClassService],
  imports: [TypeOrmModule.forFeature([ClassEntity, StudentEntity])],
})
export class ClassModule {}