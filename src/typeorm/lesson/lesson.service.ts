import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { Lesson } from './entity/lesson.entity'
import { Student } from './entity/student.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) { }
  async createLesson({ name, teacher }: { name: string, teacher: string }) {
    const isLessonExist = await this.lessonRepository.findOneBy({
      name
    })
    if (isLessonExist) {
      throw new HttpException(`课程 ${name} 已存在, 请勿重复创建`, HttpStatus.BAD_REQUEST)
    }
    const lesson = new Lesson()
    lesson.name = name
    lesson.teacher = teacher
    await this.lessonRepository.save(lesson)
    return '课程创建成功'
  }
  async createStudentWithLesson({ name, lesson_id }: { name: string, lesson_id: string }) {
    const lesson = await this.lessonRepository.findOneBy({
      id: Number(lesson_id)
    })
    if (!lesson) {
      throw new HttpException('课程不存在或已经删除', HttpStatus.BAD_REQUEST)
    }
    const isStudentExist = await this.studentRepository.findOneBy({
      name
    })
    if (!isStudentExist) {
      const student = new Student()
      student.name = name
      await this.studentRepository.save(student)
      lesson.students = lesson.students ?? []
      console.log(lesson.students)
      lesson.students.push(student)
      await this.lessonRepository.save(lesson)
    } else {
      lesson.students = lesson.students ?? []
      lesson.students.push(isStudentExist)
      await this.lessonRepository.save(lesson)
    }
    return 'success'
  }
}
