import { Module } from '@nestjs/common'
import { LessonController } from './lesson.conroller'
import { LessonService } from './lesson.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entity/lesson.entity'
import { Student } from './entity/student.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}