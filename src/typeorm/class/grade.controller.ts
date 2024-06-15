import { Body, Controller, Post } from "@nestjs/common";
import { GradeService } from './grade.service';
import { CreateGradeDto } from './grade.dto';
import { CreateStudentDto } from './student.dto'

@Controller('typeorm/grade')
export class GradeController {
  constructor(private gradeService: GradeService) {}
  @Post('create')
  createClass(@Body() createGradeDto: CreateGradeDto) {
    const { name } = createGradeDto;
    return this.gradeService.createGrade(name);
  }
  @Post('create_student')
  createStudent(@Body() studentDto: CreateStudentDto) {
    console.log(studentDto)
    return this.gradeService.createStudent(studentDto)
  }
  @Post('get_grade_students')
  getGradeStudents(@Body('id') id: number) {
    return this.gradeService.getGradeStudentsList(id)
  }
  @Post('get_student')
  getStudent(@Body('id') id: number) {
    return this.gradeService.getStudent(id)
  }
  @Post('get_student_without_grade')
  getStudentWithoutGrade(@Body('id') id: number) {
    return this.gradeService.getStudentWithoutGrade(id)
  }
}