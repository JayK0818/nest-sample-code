import { Module } from "@nestjs/common";
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { Grade } from './grade.entity'
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [GradeController],
  providers: [GradeService],
  imports: [TypeOrmModule.forFeature([Grade, Student])],
})
export class GradeModule {}