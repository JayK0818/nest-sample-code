import { Body, Controller, Post } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { CreateLessonDto, CreateStudentDto } from './lesson.dto';

@Controller('typeorm/lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}
  @Post('create')
  create(@Body() createLessonDto: CreateLessonDto) {
    const { name, teacher } = createLessonDto;
    console.log('创建课程:', name, teacher);
    return this.lessonService.createLesson(createLessonDto);
  }
  @Post('create_student')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    console.log('创建学生并选课:', createStudentDto)
    return this.lessonService.createStudentWithLesson(createStudentDto)
  }
  @Post('get_lesson_students_list') // 获取课程下的学生列表
  getLessonStudentsList(@Body('id') id: number) {
    return this.lessonService.getLessonStudentsList(id)
  }
  @Post('get_student_lesson_list')
  getStudentLessonList(@Body('id') id: number) {
    return this.lessonService.getStudentLessonList(id)
  }
}