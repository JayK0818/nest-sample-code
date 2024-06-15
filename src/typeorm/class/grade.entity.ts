import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Student } from './student.entity';

@Entity()
  // 这个是表明
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 一个班级可以有多个学生, 每个学生对应一个班级
  @OneToMany(() => Student, (student) => student.grade)
  students: Student[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date
}