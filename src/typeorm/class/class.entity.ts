import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { StudentEntity as Student } from './student.entity'

@Entity()
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 一个班级可以有多个学生, 每个学生对应一个班级
  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}