import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Grade } from './grade.entity';
import { Student } from './student.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import type { CreateStudentDto } from './student.dto'

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) {}
  async createGrade(name: string) {
    try {
      const isExist = await this.gradeRepository.findOneBy({
        name,
      });
      if (isExist) {
        throw new HttpException(
          '班级已存在,请不要重复创建',
          HttpStatus.BAD_REQUEST,
        );
      }
      const grade = new Grade();
      grade.name = name;
      await this.gradeRepository.save(grade);
      return 'success';
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST, {
        cause: err,
      });
    }
  }
  async createStudent(student_props: CreateStudentDto) {
    const { name, age, grade_id } = student_props
    try {
      const grade = await this.gradeRepository.findOneBy({
        id: grade_id,
      });
      if (!grade) {
        throw new HttpException('班级不存在或已经删除', HttpStatus.BAD_REQUEST);
      }
      const isStudentExist = await this.studentRepository.findOneBy({
        name
      })
      if (isStudentExist) {
        throw new HttpException(`学生 ${name} 已存在, 请勿重复创建`, HttpStatus.BAD_REQUEST)
      }
      const student = new Student();
      student.age = age
      student.name = name
      student.grade = grade_id
      await this.studentRepository.save(student)
      // await this.gradeRepository.save(grade)
/*       student.grade = grade_id
      await this.studentRepository.save(student) */
/*       grade.students = [student]
      await this.gradeRepository.save(grade) */
      return '学生保存成功'
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST, {
        cause: err
      })
    }
  }
  // 获取所有班级以及包含的学生
  async getGradeStudentsList(id: number) {
    const res = await this.gradeRepository.find({
      where: {
        id
      },
      relations: ['students']
    })
    return res
  }
  // 获取学生及其班级信息
  async getStudent(id: number) {
    const res = await this.studentRepository.find({
      where: {
        id
      },
      relations: ['grade']
    })
    return res
  }
  // 获取学生信息不包含班级
  async getStudentWithoutGrade(id: number) {
    const res = await this.studentRepository.findOneBy({
      id
    })
    return res
  }
}